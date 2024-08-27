import { parseUnits } from "ethers/lib/utils";
import { JSBI, type Pair, type Token, TokenAmount } from "minime-sdk";
import { useEffect } from "react";

import { usePairs } from "components/Trade/Swap/hooks/usePairs";
import { useGetTokenPrice } from "queries/tokens";
import { useLiquidityStore } from "store/useLiquidityStore";
import { type LiquidityType, type PoolDetails } from "types/common";

interface Props {
  list: LiquidityType[];
}

const isStable = (symbol: string) => {
  if (symbol.includes("m.")) return true;

  return symbol === "USDC" || symbol === "USDT";
};

const createTokenAmount = (token: Token, amount: string) => {
  const newAmount = JSBI.BigInt(parseUnits(amount, token.decimals).toString());

  return new TokenAmount(token, newAmount);
};

const getLiquidity = (pair: Pair, tokenPrices: Record<string, string>) => {
  const token0Symbol = pair.token0.symbol;
  const token1Symbol = pair.token1.symbol;

  const isStable0 = isStable(token0Symbol);
  const isStable1 = isStable(token1Symbol);

  const price0 = createTokenAmount(
    pair.token0,
    isStable0 ? "1" : tokenPrices[token0Symbol]
  );

  const price1 = createTokenAmount(
    pair.token1,
    isStable1 ? "1" : tokenPrices[token1Symbol]
  );

  const reservesA = pair.reserve0;
  const reservesB = pair.reserve1;

  const liquidityA = reservesA.multiply(price0);
  const liquidityB = reservesB.multiply(price1);
  const totalLiquidity = liquidityA.add(liquidityB);

  return totalLiquidity.toSignificant(6);
};

export default function usePoolsDetails({ list }: Props) {
  const { data: tokenPrice } = useGetTokenPrice();
  const { updatePoolsMap, poolsMap } = useLiquidityStore();
  const pairs = usePairs(list.map(({ tokens }) => tokens));

  useEffect(() => {
    const getData = async () => {
      if (!pairs.length) return;
      if (!tokenPrice) return;

      const isEveryPair = pairs.every((pair) => {
        return poolsMap[pair.liquidityToken.address];
      });

      if (isEveryPair) return;

      const poolsMapRecord: Record<string, PoolDetails> = {};
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        const poolDetails = poolsMap[pair.liquidityToken.address];
        if (poolDetails) continue;

        const { token0, token1 } = pair;
        const priceOfA = pair.priceOf(token0);
        const priceOfB = pair.priceOf(token1);
        const prices = [priceOfA.toSignificant(6), priceOfB.toSignificant(6)];
        const liquidity = getLiquidity(pair, tokenPrice);
        const reservesA = pair.reserve0.toFixed();
        const reservesB = pair.reserve1.toFixed();

        const newPoolDetails: PoolDetails = {
          balances: {
            [token0.address]: reservesA,
            [token1.address]: reservesB,
          },
          liquidity,
          lpReward: "0",
          symbols: {
            [token0.address]: token0.symbol,
            [token1.address]: token1.symbol,
          },
          prices: { [token0.address]: prices[0], [token1.address]: prices[1] },
          address: pair.liquidityToken.address,
        };

        poolsMapRecord[pair.liquidityToken.address] = newPoolDetails;
      }
      updatePoolsMap(poolsMapRecord);
    };

    getData();
  }, [tokenPrice, pairs, poolsMap, updatePoolsMap]);

  return { pairs, poolsMap };
}

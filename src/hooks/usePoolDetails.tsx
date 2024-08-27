import { parseUnits } from "ethers/lib/utils";
import { JSBI, type Pair, type Token, TokenAmount } from "minime-sdk";
import { useEffect } from "react";

import { usePair } from "components/Trade/Swap/hooks/usePairs";
import { useGetTokenPrice } from "queries/tokens";
import { useLiquidityStore } from "store/useLiquidityStore";
import { type PoolDetails } from "types/common";

interface Props {
  tokenA: Token;
  tokenB: Token;
}

const INITIAL_DETAILS: PoolDetails = {
  balances: {},
  liquidity: "0",
  lpReward: "0",
  prices: {},
  address: "",
  symbols: {},
};

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

export default function usePoolDetails({ tokenA, tokenB }: Props) {
  const { updatePoolDetails, poolDetails } = useLiquidityStore();

  const { data: tokenPrice } = useGetTokenPrice();

  const pair = usePair(tokenA, tokenB);

  useEffect(() => {
    const getData = async () => {
      if (poolDetails && !pair) {
        useLiquidityStore.setState({ poolDetails: null });
      }
      if (!pair) return;
      if (!tokenPrice) return;
      if (poolDetails) {
        const { address } = poolDetails;
        if (address === pair.liquidityToken.address) return;
      }
      const priceOfA = pair.priceOf(tokenA);
      const priceOfB = pair.priceOf(tokenB);
      const prices = [priceOfA.toSignificant(6), priceOfB.toSignificant(6)];

      const liquidity = getLiquidity(pair, tokenPrice);

      const reservesA = pair.reserve0.toFixed();
      const reservesB = pair.reserve1.toFixed();

      const newPoolDetails: PoolDetails = {
        balances: { [tokenA.address]: reservesA, [tokenB.address]: reservesB },
        liquidity,
        lpReward: "0",
        symbols: {
          [tokenA.address]: tokenA.symbol,
          [tokenB.address]: tokenB.symbol,
        },
        prices: { [tokenA.address]: prices[0], [tokenB.address]: prices[1] },
        address: pair.liquidityToken.address,
      };

      updatePoolDetails(newPoolDetails);
    };

    getData();
  }, [tokenA, tokenB, pair, poolDetails, updatePoolDetails, tokenPrice]);

  return { poolDetails: poolDetails || INITIAL_DETAILS };
}

import { type Token } from "minime-sdk";
import { useEffect } from "react";

import { usePair } from "components/Trade/Swap/hooks/usePairs";
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

export default function usePoolDetails({ tokenA, tokenB }: Props) {
  const { updatePoolDetails, poolDetails } = useLiquidityStore();
  const pair = usePair(tokenA, tokenB);

  useEffect(() => {
    const getData = async () => {
      if (poolDetails && !pair) {
        useLiquidityStore.setState({ poolDetails: null });
      }
      if (!pair) return;
      if (poolDetails) {
        const { address } = poolDetails;
        if (address === pair.liquidityToken.address) return;
      }
      const priceOfA = pair.priceOf(tokenA);
      const priceOfB = pair.priceOf(tokenB);
      const prices = [priceOfA.toSignificant(6), priceOfB.toSignificant(6)];

      const reservesA = pair.reserve0.toSignificant(6);
      const reservesB = pair.reserve1.toSignificant(6);

      const newPoolDetails: PoolDetails = {
        balances: { [tokenA.address]: reservesA, [tokenB.address]: reservesB },
        liquidity: "0",
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
  }, [tokenA, tokenB, pair, poolDetails, updatePoolDetails]);

  return { poolDetails: poolDetails || INITIAL_DETAILS };
}

import { Currency, Pair, TokenAmount } from "minime-sdk";
import React from "react";

import { chainId } from "components/Trade/Swap/constants";
import { wrappedCurrency } from "components/Trade/Swap/utils";
import { DEFAULT_BATCH_SIZE, PairAbi } from "config";
import { Batch, multicall, useMultiCallContract } from "utils/multicall";

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

const batchLoader = new Batch({
  batchSize: DEFAULT_BATCH_SIZE,
  multiCallFn: async (queryInfos) => multicall(queryInfos, false),
});

export function usePairs(
  currencies: [Currency | undefined, Currency | undefined][]
): Pair[] {
  const tokens = React.useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [currencies]
  );

  const pairAddresses: any = React.useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB)
          ? Pair.getAddress(tokenA, tokenB)
          : undefined;
      }),
    [tokens]
  );

  const queryInfos = pairAddresses.map((address: any) => ({
    address,
    method: "getReserves",
    abi: PairAbi,
  }));

  const { data: reserves = [] } = useMultiCallContract<Pair[]>(
    "swapInfo",
    queryInfos,
    {
      batchLoader,
      select: (reserves) => {
        return reserves.map((reserve: any, i: number) => {
          const tokenA = tokens[i][0];
          const tokenB = tokens[i][1];

          if (!reserve || !tokenA || !tokenB || tokenA.equals(tokenB)) {
            return undefined;
          }

          const [token0, token1] = tokenA.sortsBefore(tokenB)
            ? [tokenA, tokenB]
            : [tokenB, tokenA];

          const { reserve0, reserve1 } = reserve;

          return new Pair(
            new TokenAmount(token0, reserve0.toString()),
            new TokenAmount(token1, reserve1.toString())
          );
        });
      },
      refetchInterval: 5000,
    }
  );

  return reserves;
}

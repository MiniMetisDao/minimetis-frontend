import { type Currency, Pair, TokenAmount } from "minime-sdk";
import React, { useMemo } from "react";

import { wrappedCurrency } from "components/Trade/Swap/utils";
import { DEFAULT_BATCH_SIZE, pairAbi } from "config";
import { chainId } from "config/trade/constants";
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
    abi: pairAbi,
  }));

  const { data: reserves = [] } = useMultiCallContract<Pair[]>(
    ["trade", "swap", "swapInfo"],
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

export function usePair(tokenA?: Currency, tokenB?: Currency) {
  const inputs: [[Currency | undefined, Currency | undefined]] = useMemo(
    () => [[tokenA, tokenB]],
    [tokenA, tokenB]
  );

  return usePairs(inputs)[0];
}

import flatMap from "lodash.flatmap";
import { Currency, Pair, Token } from "minime-sdk";
import React from "react";

import {
  BASES_TO_CHECK_TRADES_AGAINST,
  CUSTOM_BASES,
  chainId,
} from "components/Trade/Swap/constants";
import { wrappedCurrency } from "components/Trade/Swap/utils";

import { usePairs } from "./usePairs";

export function useLpPairs(
  currencyA?: Currency,
  currencyB?: Currency
): Pair[] | any {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bases: Token[] = chainId
    ? (BASES_TO_CHECK_TRADES_AGAINST as any)[chainId]
    : [];

  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined];

  const basePairs: [Token, Token][] = React.useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] =>
        bases.map((otherBase) => [base, otherBase])
      ).filter(([t0, t1]) => t0.address !== t1.address),
    [bases]
  );

  const allPairCombinations: [Token, Token][] = React.useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] =>
              Boolean(tokens[0] && tokens[1])
            )
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA, tokenB]) => {
              if (!chainId) return true;
              const customBases = (CUSTOM_BASES as any)[chainId];
              if (!customBases) return true;

              const customBasesA: Token[] | undefined =
                customBases[tokenA.address];

              const customBasesB: Token[] | undefined =
                customBases[tokenB.address];

              if (!customBasesA && !customBasesB) return true;

              if (
                customBasesA &&
                !customBasesA.find((base) => tokenB.equals(base))
              )
                return false;
              if (
                customBasesB &&
                !customBasesB.find((base) => tokenA.equals(base))
              )
                return false;

              return true;
            })
        : [],
    [tokenA, tokenB, bases, basePairs]
  );

  const allPairs = usePairs(allPairCombinations);

  // only pass along valid pairs, non-duplicated pairs
  return React.useMemo(() => {
    const pairValues = allPairs?.reduce((cache: any, curr: any): any => {
      if (curr?.liquidityToken?.address) {
        cache[curr.liquidityToken.address] =
          cache[curr?.liquidityToken?.address] ?? curr;
      }

      return cache;
    }, {});

    return Object.values(pairValues ?? {});
  }, [allPairs]);
}

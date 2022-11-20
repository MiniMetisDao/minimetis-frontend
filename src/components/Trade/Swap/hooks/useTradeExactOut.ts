import { type Currency, type CurrencyAmount, Trade } from "minime-sdk";
import React from "react";

import { isTradeBetter } from "components/Trade/Swap/utils";
import {
  BETTER_TRADE_LESS_HOPS_THRESHOLD,
  MAX_HOPS,
  singleHopOnly,
} from "config/trade/constants";

import { useLpPairs } from "./useLpPairs";

export function useTradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount
): Trade | undefined {
  const allowedPairs = useLpPairs(currencyIn, currencyAmountOut?.currency);

  return React.useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return (
          Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
            maxHops: 1,
            maxNumResults: 1,
          })[0] ?? undefined
        );
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | undefined = undefined;
      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade =
          Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
            maxHops: i,
            maxNumResults: 1,
          })[0] ?? undefined;
        if (
          isTradeBetter(
            bestTradeSoFar,
            currentTrade,
            BETTER_TRADE_LESS_HOPS_THRESHOLD
          )
        ) {
          bestTradeSoFar = currentTrade;
        }
      }

      return bestTradeSoFar;
    }

    return undefined;
  }, [currencyIn, currencyAmountOut, allowedPairs]);
}

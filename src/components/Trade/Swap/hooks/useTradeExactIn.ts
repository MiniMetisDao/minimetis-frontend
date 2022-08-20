import { Currency, CurrencyAmount, Trade } from "@netswap/sdk";
import React from "react";

import {
  BETTER_TRADE_LESS_HOPS_THRESHOLD,
  MAX_HOPS,
  singleHopOnly,
} from "components/Trade/Swap/constants";
import { isTradeBetter } from "components/Trade/Swap/utils";

import { useLpPairs } from "./useLpPairs";

export function useTradeExactIn(
  currencyAmountIn?: CurrencyAmount,
  currencyOut?: Currency
): Trade | undefined {
  const allowedPairs = useLpPairs(currencyAmountIn?.currency, currencyOut);

  return React.useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return Trade.bestTradeExactIn(
          allowedPairs,
          currencyAmountIn,
          currencyOut,
          {
            maxHops: 1,
            maxNumResults: 1,
          }
        )[0];
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | undefined = undefined;

      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade: Trade = Trade.bestTradeExactIn(
          allowedPairs,
          currencyAmountIn,
          currencyOut,
          {
            maxHops: i,
            maxNumResults: 1,
          }
        )[0];
        // if current trade is best yet, save it
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
  }, [allowedPairs, currencyAmountIn, currencyOut]);
}
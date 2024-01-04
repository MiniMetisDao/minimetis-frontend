import { type CurrencyAmount, JSBI, Percent, type Trade } from "minime-sdk";

import { BIPS_BASE } from "config/trade/constants";

import { Field } from "./types";

// converts a basis points value to a sdk percent
function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), BIPS_BASE);
}

export function computeSlippageAdjustedAmounts(
  trade: Trade | undefined,
  allowedSlippage: number
): { [field in Field]?: CurrencyAmount } {
  const pct = basisPointsToPercent(allowedSlippage);

  return {
    [Field.INPUT]: trade?.maximumAmountIn(pct),
    [Field.OUTPUT]: trade?.minimumAmountOut(pct),
  };
}

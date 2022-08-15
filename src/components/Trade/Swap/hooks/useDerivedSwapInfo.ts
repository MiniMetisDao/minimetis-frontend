import { Currency, CurrencyAmount, Trade } from "@netswap/sdk";

import { tryParseAmount } from "components/Trade/Swap/utils";

import { useTradeExactIn } from "./useTradeExactIn";
import { useTradeExactOut } from "./useTradeExactOut";

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

type Options = {
  typedValue: string;
  independentField: Field;
  inputCurrency: Currency;
  outputCurrency: Currency;
};

type DerivedSwapInfo = {
  parsedAmount?: CurrencyAmount;
  trade?: Trade;
};

export function useDerivedSwapInfo({
  independentField,
  inputCurrency,
  outputCurrency,
  typedValue,
}: Options): DerivedSwapInfo {
  const isExactIn: boolean = independentField === Field.INPUT;

  const parsedAmount = tryParseAmount(
    typedValue,
    (isExactIn ? inputCurrency : outputCurrency) ?? undefined
  );

  const bestTradeExactIn = useTradeExactIn(
    isExactIn ? parsedAmount : undefined,
    outputCurrency ?? undefined
  );

  const bestTradeExactOut = useTradeExactOut(
    inputCurrency ?? undefined,
    !isExactIn ? parsedAmount : undefined
  );

  const trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;

  return {
    parsedAmount,
    trade,
  };
}

import { type Currency, CurrencyAmount, JSBI, METIS } from "minime-sdk";
import { useCallback, useMemo } from "react";

import { usePair } from "components/Trade/Swap/hooks/usePairs";
import {
  tryParseAmount,
  wrappedCurrency,
  wrappedCurrencyAmount,
} from "components/Trade/Swap/utils";
import { chainId } from "config/trade/constants";
import { useReserves } from "queries/trade/useReserves";
import { type Balance, type LiquidityType } from "types/common";

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

type Options = {
  typedValue: string;
  independentField: Field;
  inputCurrency: Currency;
  outputCurrency: Currency;
  lp: LiquidityType | null;
  balances: Balance | undefined;
};

const ZERO = JSBI.BigInt(0);

export function useDerivedPool({
  independentField,
  inputCurrency,
  outputCurrency,
  typedValue,
  lp,
}: Options) {
  const pair = usePair(inputCurrency, outputCurrency);
  const totalSupply = useReserves(lp ? lp.address : null);

  const noLiquidity = useCallback(() => {
    if (!pair) return true;
    if (totalSupply === "0") return true;
    if (
      JSBI.equal(pair.reserve0.quotient, ZERO) &&
      JSBI.equal(pair.reserve1.quotient, ZERO)
    )
      return true;

    return false;
  }, [pair, totalSupply]);

  const isInput = independentField === Field.INPUT;

  const independentAmount = tryParseAmount(
    typedValue,
    (isInput ? inputCurrency : outputCurrency) ?? undefined
  );

  const independtCurrency = isInput ? inputCurrency : outputCurrency;
  const dependentCurrency = isInput ? outputCurrency : inputCurrency;

  const dependentAmount = useMemo(() => {
    if (noLiquidity()) {
      if (typedValue) {
        return tryParseAmount(typedValue, dependentCurrency);
      }

      return undefined;
    } else if (independentAmount && pair) {
      const wrappedIndependentAmount = wrappedCurrencyAmount(
        independentAmount,
        chainId
      );

      const [tokenA, tokenB] = [
        wrappedCurrency(independtCurrency, chainId),
        wrappedCurrency(dependentCurrency, chainId),
      ];

      if (tokenA && tokenB && wrappedIndependentAmount) {
        const priceOfA = pair.priceOf(tokenA);
        const priceOfB = pair.priceOf(tokenB);

        const quoteA = priceOfA.quote(wrappedIndependentAmount);
        const quoteB = priceOfA.quote(wrappedIndependentAmount);
        const dependentTokenAmount = !isInput ? quoteA : quoteB;

        return dependentCurrency === METIS
          ? CurrencyAmount.ether(dependentTokenAmount.raw)
          : dependentTokenAmount;
      }

      return undefined;
    }
  }, [
    noLiquidity,
    typedValue,
    dependentCurrency,
    independentAmount,
    pair,
    independtCurrency,
    isInput,
  ]);

  const parsedAmounts: { [field in Field]: CurrencyAmount | undefined } = {
    [Field.INPUT]:
      independentField === Field.INPUT ? independentAmount : dependentAmount,
    [Field.OUTPUT]:
      independentField === Field.INPUT ? dependentAmount : independentAmount,
  };

  return { parsedAmounts };
}

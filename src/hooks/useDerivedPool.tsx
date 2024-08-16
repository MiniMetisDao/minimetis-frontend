import BigNumber from "bignumber.js";
import {
  type Currency,
  CurrencyAmount,
  METIS,
  Percent,
  TokenAmount,
} from "minime-sdk";
import { useMemo } from "react";

import { usePair } from "components/Trade/Swap/hooks/usePairs";
import {
  tryParseAmount,
  wrappedCurrency,
  wrappedCurrencyAmount,
} from "components/Trade/Swap/utils";
import { chainId } from "config/trade/constants";
import { useReserves } from "queries/trade/useReserves";
import {
  type Balance,
  Field,
  type LiquidityType,
  type ParsedAmounts,
} from "types/common";

type Options = {
  typedValue: string;
  independentField: Field;
  inputCurrency: Currency;
  outputCurrency: Currency;
  lp: LiquidityType | null;
  balances: Balance | undefined;
};

export function useDerivedPool({
  independentField,
  inputCurrency,
  outputCurrency,
  typedValue,
  lp,
}: Options) {
  const pair = usePair(inputCurrency, outputCurrency);
  const totalSupply = useReserves(lp ? lp.address : null);

  const noLiquidity = useMemo(() => {
    if (!pair) {
      return true;
    }
    if (BigNumber(totalSupply).isLessThanOrEqualTo(0)) {
      return true;
    }

    return false;
  }, [pair, totalSupply]);

  const isInput = independentField === Field.INPUT;

  const independentAmount = tryParseAmount(
    typedValue,
    (isInput ? inputCurrency : outputCurrency) ?? undefined
  );

  const independtCurrency = isInput ? inputCurrency : outputCurrency;
  const dependentCurrency = isInput ? outputCurrency : inputCurrency;
  const dependentField = isInput ? Field.OUTPUT : Field.INPUT;

  const dependentAmount = useMemo(() => {
    if (noLiquidity) {
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
        wrappedCurrency(inputCurrency, chainId),
        wrappedCurrency(outputCurrency, chainId),
      ];

      if (tokenA && tokenB && wrappedIndependentAmount) {
        const priceOfA = pair.priceOf(tokenA);
        const priceOfB = pair.priceOf(tokenB);

        const isOutput = dependentField === Field.OUTPUT;
        try {
          const dependentTokenAmount = isOutput
            ? priceOfA.quote(wrappedIndependentAmount)
            : priceOfB.quote(wrappedIndependentAmount);

          return dependentCurrency === METIS
            ? CurrencyAmount.ether(dependentTokenAmount.raw)
            : dependentTokenAmount;
        } catch (error) {
          return undefined;
        }
      }

      return undefined;
    }
  }, [
    noLiquidity,
    typedValue,
    dependentCurrency,
    independentAmount,
    pair,
    dependentField,
    inputCurrency,
    outputCurrency,
  ]);

  const parsedAmounts: ParsedAmounts = useMemo(
    () => ({
      [independentField]: independentAmount ?? CurrencyAmount.ether("0"),
      [dependentField]: dependentAmount ?? CurrencyAmount.ether("0"),
    }),
    [independentAmount, dependentAmount, dependentField, independentField]
  );

  const prices: Record<string, string | undefined> = useMemo(() => {
    const DEFAULT_PRICES = {
      [independentField]: undefined,
      [dependentField]: undefined,
    };
    if (!pair) return DEFAULT_PRICES;
    const [tokenA, tokenB] = [
      wrappedCurrency(independtCurrency, chainId),
      wrappedCurrency(dependentCurrency, chainId),
    ];
    if (tokenA && tokenB) {
      const priceOfA = pair.priceOf(tokenA);
      const priceOfB = pair.priceOf(tokenB);

      return {
        [independentField]: priceOfA.toSignificant(6),
        [dependentField]: priceOfB.toSignificant(6),
      };
    }

    return DEFAULT_PRICES;
  }, [
    pair,
    independtCurrency,
    dependentCurrency,
    dependentField,
    independentField,
  ]);

  const liquidityMinted = useMemo(() => {
    const { [Field.INPUT]: currencyAAmount, [Field.OUTPUT]: currencyBAmount } =
      parsedAmounts;

    const [tokenAmountA, tokenAmountB] = [
      wrappedCurrencyAmount(currencyAAmount, chainId),
      wrappedCurrencyAmount(currencyBAmount, chainId),
    ];

    if (pair && totalSupply && tokenAmountA && tokenAmountB) {
      const tsAmount = new TokenAmount(
        pair.liquidityToken,
        totalSupply.toString()
      );

      try {
        const result = pair.getLiquidityMinted(
          tsAmount,
          tokenAmountA,
          tokenAmountB
        );

        return result;
      } catch (error) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }, [parsedAmounts, pair, totalSupply]);

  const poolTokenPercentage = useMemo(() => {
    if (liquidityMinted && totalSupply && pair) {
      const tsAmount = new TokenAmount(
        pair.liquidityToken,
        totalSupply.toString()
      );

      return new Percent(
        liquidityMinted.raw,
        tsAmount.add(liquidityMinted).raw
      );
    } else {
      return undefined;
    }
  }, [liquidityMinted, totalSupply, pair]);

  return {
    parsedAmounts,
    dependentField,
    noLiquidity,
    prices,
    poolTokenPercentage,
  };
}

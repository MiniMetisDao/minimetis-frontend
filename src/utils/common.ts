import BigNumber from "bignumber.js";
import { commify, formatUnits, parseUnits } from "ethers/lib/utils";

import { TRADE_SETTINGS } from "config";
import { FixedNumber } from "ethers";
import { type Token } from "types/common";

import type { AmountType } from "./types";

// amount = 1000000000000000000
// decimals = 18
// return 1
export const getHumanReadableAmount = (
  amount: string,
  decimals: number | string
) => {
  return BigNumber(amount).div(BigNumber(10).pow(decimals));
};

// amount = 1
// decimals = 18
// return 1000000000000000000
export const getAmount = (amount: string, decimals: number | string) => {
  return BigNumber(amount).multipliedBy(BigNumber(10).pow(decimals));
};

export const getDisplayPrice = (
  amount?: string,
  decimals?: number | string,
  multiplyFactor?: string,
  waitForMultiplyFactor = false
) => {
  try {
    if (waitForMultiplyFactor && multiplyFactor === undefined) {
      throw new Error("Waiting for multiplyFactor");
    }
    if (!amount || !decimals) {
      throw new Error("No price value provided");
    }
    const displayPrice = getHumanReadableAmount(amount, decimals).multipliedBy(
      multiplyFactor || 1
    );

    return displayPrice.toFixed();
  } catch (error) {
    return undefined;
  }
};

export const getShortTransactionHash = (address: string) =>
  address.substring(0, 10) + "..." + address.substring(address.length - 8);

export const searchExactToken = (tokenList: Token[], searchString: string) => {
  return tokenList.find((token: Token) =>
    Boolean(
      token.symbol.toLowerCase() === searchString.toLowerCase() ||
        token.name.toLowerCase() === searchString.toLowerCase() ||
        token.address === searchString
    )
  );
};

export const searchToken = (tokenList: Token[], searchString: string) => {
  return tokenList.filter((token: Token) =>
    Boolean(
      token.address.indexOf(searchString) === 0 ||
        token.name.toLowerCase().includes(searchString.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchString.toLowerCase())
    )
  );
};

// token amount in ether
export const getTokenAmount = (token?: Token, amount?: string) => {
  if (!token || !amount) {
    return "0";
  }

  return parseUnits(amount, token.decimals);
};

// human readable format
export const getFormattedAmount = (token?: Token, amount?: string) => {
  if (!token || !amount) {
    return "0";
  }

  return formatUnits(amount, token.decimals);
};

// only to display finally on screen, do not do operations on this
export const getFormattedAmountRounded = (token?: Token, amount?: string) => {
  const formattedAmount = getFormattedAmount(token, amount);
  const roundedNumber = FixedNumber.from(formattedAmount).round(2);

  return commify(roundedNumber.toString());
  // do we need to put 2 zero at ending everywhere?
  // const formattedNumber = commify(roundedNumber.toString());
  // const numberParts = formattedNumber.split(".");

  // return `${numberParts[0]}.${numberParts[1] === "0" ? "00" : numberParts[1]}`;
};

// check for positive values and dot. Use for allowing typing in fields
export const isValidNumberInput = (value: string) => {
  const pattern = new RegExp(/^\d*\.?\d*$/);

  return pattern.test(value);
};

// check for valid number and positive. Use for verifying
export const isValidNumber = (value: string) => {
  const pattern = new RegExp(/^\d*\.?\d+$/);

  return pattern.test(value);
};

/**
 * keep only n decimals without rounding
 * @param value
 * @param decimals
 * @returns
 */
export const truncateNumber = (value: string, decimals: number) => {
  const re = new RegExp("^-?\\d+(?:.\\d{0," + (decimals || -1) + "})?");
  const matcher = value.match(re);

  return matcher ? matcher[0] : value;
};

export const getDeadlineTimestamp = (deadline: number) => {
  return Math.floor(Date.now() / 1000) + 60 * deadline;
};

// max slippage allowed is 50%
export const getSlippageTolerance = (slippage: string | number) => {
  const slippageInput = BigNumber(slippage).isNaN()
    ? TRADE_SETTINGS.slippage
    : slippage;

  const slippageValue = BigNumber(BigNumber(slippageInput).toFixed(2))
    .multipliedBy(100)
    .toNumber();

  return slippageValue > 5000 ? 5000 : slippageValue;
};

export const getSlippageToleranceInput = (slippage: number) => {
  return BigNumber(slippage).dividedBy(100).toFixed(2);
};

/**
 * Format a large number string to a concise representation.
 * @param {string} stringValue - The number string to be formatted.
 * @returns {string} - Formatted string, possibly appended with 'M'.
 */
export const formatLargeNumber = (value: string): string => {
  const million = 1000000;

  if (value.includes(".")) {
    value = value.split(".")[0];
  }
  if (value.length >= 7) {
    const millions = (parseFloat(value) / million).toFixed(0);

    return millions + "M";
  }

  return value;
};

const ONLY_LETTERS = /[a-zA-Z]/;
/**
 * Formats an `amount` as a string with commas for the integer part and a period and `decimals` decimals (if any) for the decimal part.
 * @param {string} amount - The amount to format as a string.
 * @param {AmountType} type - The type of formatting to use ('price' for dollar formatting, 'percentage' for percentage formatting, or anything else for plain formatting).
 * @param {number} decimals - The number of decimal places to show in the formatted amount (defaults to 2 if not specified).
 * @returns {string} The formatted `amount` as a string.
 */
export const formatAmount = (
  amount: string,
  type: AmountType,
  decimals = 2
): string => {
  try {
    const amountNum = Number(amount);
    let formatAmount = "";
    if (amount) {
      if (amountNum >= 10_000_000) return formatLargeNumber(amount);
      if (ONLY_LETTERS.test(amount)) return amount;

      const hasDecimal = amount.includes(".");

      const [integerPart, decimalPart] = hasDecimal
        ? amount.split(".")
        : [amount, null];

      const decimalPartWithoutZero =
        decimalPart && decimalPart === "0" ? "" : decimalPart;

      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );

      const formattedDecimalPart = decimalPartWithoutZero
        ? `.${decimalPartWithoutZero.slice(0, decimals)}`
        : "";

      formatAmount = `${formattedIntegerPart}${formattedDecimalPart}`;
      if (decimals === 3 && amountNum > 0 && amountNum < 0.001) {
        formatAmount = "<0.001";
      } else if (decimals === 2 && amountNum > 0 && amountNum < 0.01) {
        formatAmount = "<0.01";
      }

      if (type === "price") return `$${formatAmount}`;
      if (type === "percentage") return `${formatAmount}%`;
    }

    return formatAmount;
  } catch {
    return "";
  }
};

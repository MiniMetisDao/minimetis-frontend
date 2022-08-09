import { commify, formatUnits, parseUnits } from "ethers/lib/utils";

import { FixedNumber } from "ethers";
import { Token } from "types/common";

export const getDisplayPrice = (
  tokenPrice?: number,
  tokenDecimal?: number,
  multiplyFactor?: number,
  waitForMultiplyFactor = false
) => {
  try {
    if (waitForMultiplyFactor && multiplyFactor === undefined) {
      throw new Error("Waiting for multiplyFactor");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const displayPrice = (tokenPrice! / tokenDecimal!) * (multiplyFactor || 1);
    if (isNaN(displayPrice)) {
      throw new Error("Got NaN");
    }

    return displayPrice;
  } catch (error) {
    return undefined;
  }
};

export const getShortTransactionHash = (address: string) =>
  address.substring(0, 10) + "..." + address.substring(address.length - 8);

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

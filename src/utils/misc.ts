import { commify, formatUnits } from "ethers/lib/utils";

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
};

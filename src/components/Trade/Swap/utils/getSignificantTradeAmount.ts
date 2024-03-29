import { type Fraction } from "minime-sdk";

import { ONE } from "../../../../config/trade/constants";

export const getSignificantTradeAmount = (
  amount?: Fraction,
  significantDigits = 4
) => {
  return (
    (amount?.lessThan(ONE)
      ? amount?.toSignificant(significantDigits)
      : amount?.toFixed(significantDigits)) || ""
  );
};

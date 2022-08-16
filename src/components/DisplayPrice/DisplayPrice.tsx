import { useTranslation } from "react-i18next";

import { getDisplayPrice } from "utils";

type DisplayPriceProps = {
  amount?: string;
  tokenSymbol?: string;
  decimals?: number;
  isBasePrice?: boolean;
  baseFactor?: string;
  isCompact?: boolean;
  roundingDecimal?: number; // how many max decimals to show
};

// 4 significantDigits when number is less than 1, else 2 max decimals by default, use roundingDecimal to override
export const DisplayPrice: React.FC<DisplayPriceProps> = ({
  amount,
  decimals,
  isBasePrice = false,
  baseFactor,
  isCompact,
  roundingDecimal,
  tokenSymbol,
}) => {
  const { t } = useTranslation();
  const translationKey = isBasePrice ? "currency" : "tokenCurrency";

  return t(translationKey, {
    value: getDisplayPrice(amount, decimals, baseFactor, isBasePrice),
    isCompact,
    tokenSymbol,
    roundingDecimal,
  });
};

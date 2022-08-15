import { useTranslation } from "react-i18next";

import { getDisplayPrice } from "utils";

type DisplayPriceProps = {
  amount?: string;
  tokenSymbol?: string;
  decimals?: number;
  isBasePrice?: boolean;
  baseFactor?: string;
  isCompact?: boolean;
};

export const DisplayPrice: React.FC<DisplayPriceProps> = ({
  amount,
  decimals,
  isBasePrice = false,
  baseFactor,
  isCompact,
  tokenSymbol,
}) => {
  const { t } = useTranslation();
  const translationKey = isBasePrice ? "currency" : "tokenCurrency";

  return t(translationKey, {
    value: getDisplayPrice(amount, decimals, baseFactor, isBasePrice),
    isCompact:
      isCompact === undefined ? (isBasePrice ? false : true) : isCompact,
    tokenSymbol,
  });
};

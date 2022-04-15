import { Decimals } from "config";
import { useTranslation } from "react-i18next";
import { getDisplayPrice } from "utils";

type DisplayPriceProps = {
  price?: number;
  tokenSymbol?: string;
  decimals?: number;
  isBasePrice?: boolean;
  baseFactor?: number;
  isCompact?: boolean;
};
export const DisplayPrice: React.FC<DisplayPriceProps> = ({
  price,
  decimals = Decimals.miniMetis,
  isBasePrice = false,
  baseFactor,
  isCompact,
  tokenSymbol,
}) => {
  const { t } = useTranslation();
  const translationKey = isBasePrice ? "currency" : "tokenCurrency";
  return t(translationKey, {
    value: getDisplayPrice(price, decimals, baseFactor, isBasePrice),
    isCompact:
      isCompact === undefined ? (isBasePrice ? false : true) : isCompact,
    tokenSymbol,
  });
};

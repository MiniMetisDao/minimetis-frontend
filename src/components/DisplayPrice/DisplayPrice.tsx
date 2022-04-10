import { useTranslation } from "react-i18next";
import { getDisplayPrice } from "utils";

interface DisplayPriceProps {
  price: number;
  decimals: number;
  isBasePrice?: boolean;
  baseFactor?: number;
  isCompact?: boolean;
}
export const DisplayPrice: React.FC<DisplayPriceProps> = ({
  price,
  decimals,
  isBasePrice = false,
  baseFactor,
  isCompact,
}) => {
  const { t } = useTranslation();
  const translationKey = isBasePrice ? "currency" : "tokenCurrency";
  return t(translationKey, {
    value: getDisplayPrice(price, decimals, baseFactor, isBasePrice),
    isCompact: isCompact || (isBasePrice ? false : true),
  });
};

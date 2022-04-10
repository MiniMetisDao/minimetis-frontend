import { BASE_CURRENCY_CODE } from "config";
import { Trans, useTranslation } from "react-i18next";
import { styles } from "./styles";

export const UserBalance: React.FunctionComponent = () => {
  const { t } = useTranslation(["dashboard"]);

  return (
    <div css={styles}>
      <h2>{t("myMiniMetis")}</h2>
      <div className="wrapper">
        <div>
          <span className="title">{t("myMiniMetisBalance")}</span>
          <span className="token-value">
            {t("tokenCurrency", { value: 100000000000000, isCompact: true })}
          </span>
          <div className="base-value">
            <span>$1,000,0000</span>
            <span className="base-value-symbol">{BASE_CURRENCY_CODE}</span>
          </div>
        </div>
        <div>
          <span className="title">{t("yourDividendSharePercentage")}</span>
          <div className="percentage-value">
            <span>3.056%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

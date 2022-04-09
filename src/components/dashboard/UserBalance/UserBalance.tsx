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
            {t("tokenCurrency", { value: 100000000000000 })}
          </span>
          <div className="base-value">
            <span>$1,000,0000</span>
            <span className="base-value-symbol">USD</span>
          </div>
        </div>
        <div>
          <span className="title">{t("yourDividentSharePercentage")}</span>
          <div className="percentage-value">
            <span>3.056%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

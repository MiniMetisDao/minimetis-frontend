import { BASE_CURRENCY_CODE } from "config";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

export const TokenStats: React.FC = () => {
  const { t } = useTranslation("dashboard");
  return (
    <div css={styles}>
      <h2>{t("miniMetisStats")}</h2>
      <div className="wrapper">
        <div className="stat-group">
          <div className="stat">
            <h4>{t("miniMetisPrice")}</h4>
            <span>
              {t("currency", { value: 1.726175820364038e-9 })}{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
          <div className="stat">
            <h4>{t("totalDividendsPaid")}</h4>
            <span>
              {t("tokenCurrency", {
                value: 230.46,
                tokenSymbol: "Metis",
                isCompact: false,
              })}
            </span>
            <span className="base-value">
              {t("currency", { value: 2300 })} {BASE_CURRENCY_CODE}
            </span>
          </div>
        </div>

        <div className="stat-group">
          <div className="stat">
            <h4>{t("totalTreasury")}</h4>
            <span>
              {t("tokenCurrency", { value: 2400, tokenSymbol: "Metis" })}
            </span>
            <span className="base-value">
              {t("currency", { value: 230000 })} {BASE_CURRENCY_CODE}
            </span>

            <span>
              {t("tokenCurrency", {
                value: 1000000123412342,
                tokenSymbol: "MiniMetis",
              })}
            </span>
            <span className="base-value">
              {t("currency", { value: 2300 })} {BASE_CURRENCY_CODE}
            </span>

            <span className="total-value">
              {t("currency", { value: 0.000_000_000_125 })} {BASE_CURRENCY_CODE}{" "}
              {t("total")}
            </span>
          </div>
        </div>

        <div className="stat-group">
          <div className="stat">
            <h4>{t("marketCap")}</h4>
            <span>
              {t("currency", { value: 3000000, isCompact: true })}{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
          <div className="stat">
            <h4>{t("totalBurned")}</h4>
            <span>
              {t("tokenCurrency", {
                value: 230.46,
                tokenSymbol: "Metis",
                isCompact: false,
              })}
            </span>
            <span className="base-value">
              {t("currency", { value: 2300 })} {BASE_CURRENCY_CODE}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

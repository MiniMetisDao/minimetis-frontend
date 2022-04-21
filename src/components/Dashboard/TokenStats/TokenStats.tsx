import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";
import { BASE_CURRENCY_CODE, Decimals } from "config";
import { useMinimeConstants } from "queries";
import { useGetDividendShare } from "queries/distributor";
import { useGetTokenPrice } from "queries/tokens";
import { useGetTreasury } from "queries/treasury";

import { styles } from "./styles";

export const TokenStats: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const { data: tokenPrice } = useGetTokenPrice();
  const { data: dividendShare } = useGetDividendShare();
  const { data: treasury } = useGetTreasury();
  const { data: minimeConstants } = useMinimeConstants();

  const totalTeasuryInBasePrice =
    treasury && tokenPrice
      ? (treasury?.metisTokens * tokenPrice?.metis) / Decimals.metis +
        (treasury?.miniMetisTokens * tokenPrice?.miniMetis) / Decimals.miniMetis
      : undefined;

  return (
    <div css={styles}>
      <h2>{t("miniMetisStats")}</h2>
      <div className="wrapper">
        <div className="stat-group">
          <div className="stat">
            <h4>{t("miniMetisPrice")}</h4>
            <span>
              {t("currency", { value: tokenPrice?.miniMetis })}{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
          <div className="stat">
            <h4>{t("totalDividendsPaid")}</h4>
            <span>
              <DisplayPrice
                price={dividendShare?.totalDistributed}
                tokenSymbol="Metis"
                isCompact={false}
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                price={dividendShare?.totalDistributed}
                isBasePrice
                baseFactor={tokenPrice?.metis}
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
        </div>

        <div className="stat-group">
          <div className="stat">
            <h4>{t("totalTreasury")}</h4>
            <span>
              <DisplayPrice
                price={treasury?.metisTokens}
                tokenSymbol="Metis"
                isCompact={false}
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                price={treasury?.metisTokens}
                isBasePrice
                baseFactor={tokenPrice?.metis}
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>

            <span>
              <DisplayPrice
                price={treasury?.miniMetisTokens}
                tokenSymbol="MiniMetis"
                isCompact={false}
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                price={treasury?.miniMetisTokens}
                isBasePrice
                baseFactor={tokenPrice?.miniMetis}
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>

            <span className="total-value">
              {t("currency", { value: totalTeasuryInBasePrice })}{" "}
              {BASE_CURRENCY_CODE} {t("total")}
            </span>
          </div>
        </div>

        <div className="stat-group">
          <div className="stat">
            <h4>{t("marketCap")}</h4>
            <span>
              <DisplayPrice
                price={minimeConstants?.getCirculatingSupply}
                isBasePrice
                baseFactor={tokenPrice?.miniMetis}
                isCompact
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
          <div className="stat">
            <h4>{t("totalBurned")}</h4>
            <span>
              <DisplayPrice
                price={
                  minimeConstants?.totalSupply -
                  minimeConstants?.getCirculatingSupply
                }
                tokenSymbol="MiniMetis"
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                price={
                  minimeConstants?.totalSupply -
                  minimeConstants?.getCirculatingSupply
                }
                isBasePrice
                baseFactor={tokenPrice?.miniMetis}
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

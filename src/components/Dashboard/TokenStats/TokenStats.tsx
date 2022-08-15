import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";
import { BASE_CURRENCY_CODE } from "config";
import { useMinimeConstants } from "queries";
import { useGetDividendShare } from "queries/distributor";
import { useGetTokenPrice } from "queries/tokens";
import { useGetTreasury } from "queries/treasury";
import { getBigNumberAmount } from "utils";

import { styles } from "./styles";

export const TokenStats: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const { data: tokenPrice } = useGetTokenPrice();
  const { data: dividendShare } = useGetDividendShare();
  const { data: treasury } = useGetTreasury();
  const { data: minimeConstants } = useMinimeConstants();

  const totalTeasuryInBasePrice =
    treasury && tokenPrice
      ? getBigNumberAmount(treasury?.metis.amount, treasury?.metis.decimals)
          .multipliedBy(tokenPrice?.metis)
          .plus(
            getBigNumberAmount(
              treasury?.miniMe.amount,
              treasury?.miniMe.decimals
            ).multipliedBy(tokenPrice?.miniMe)
          )
      : undefined;

  return (
    <div css={styles}>
      <h2>{t("miniMetisStats")}</h2>
      <div className="wrapper">
        <div className="stat-group">
          <div className="stat">
            <h4>{t("miniMetisPrice")}</h4>
            <span>
              {t("currency", { value: tokenPrice?.miniMe })}{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
          <div className="stat">
            <h4>{t("totalDividendsPaid")}</h4>
            <span>
              <DisplayPrice
                amount={dividendShare?.totalDistributed.amount}
                decimals={dividendShare?.totalDistributed.decimals}
                tokenSymbol="Metis"
                isCompact={false}
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                amount={dividendShare?.totalDistributed.amount}
                decimals={dividendShare?.totalDistributed.decimals}
                baseFactor={tokenPrice?.metis}
                isBasePrice
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
                amount={treasury?.metis.amount}
                decimals={treasury?.metis.decimals}
                tokenSymbol="Metis"
                isCompact={false}
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                amount={treasury?.metis.amount}
                decimals={treasury?.metis.decimals}
                baseFactor={tokenPrice?.metis}
                isBasePrice
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>

            <span>
              <DisplayPrice
                amount={treasury?.miniMe.amount}
                decimals={treasury?.miniMe.decimals}
                tokenSymbol="MiniMetis"
                isCompact={false}
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                amount={treasury?.miniMe.amount}
                decimals={treasury?.miniMe.decimals}
                baseFactor={tokenPrice?.miniMe}
                isBasePrice
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
                amount={minimeConstants?.getCirculatingSupply}
                decimals={minimeConstants?.decimals}
                baseFactor={tokenPrice?.miniMe}
                isBasePrice
                isCompact
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
          <div className="stat">
            <h4>{t("totalBurned")}</h4>
            <span>
              <DisplayPrice
                amount={BigNumber(minimeConstants?.totalSupply)
                  .minus(minimeConstants?.getCirculatingSupply)
                  .toFixed()}
                decimals={minimeConstants?.decimals}
                tokenSymbol="MiniMetis"
              />
            </span>
            <span className="base-value">
              <DisplayPrice
                amount={BigNumber(minimeConstants?.totalSupply)
                  .minus(minimeConstants?.getCirculatingSupply)
                  .toFixed()}
                decimals={minimeConstants?.decimals}
                baseFactor={tokenPrice?.miniMe}
                isBasePrice
              />{" "}
              {BASE_CURRENCY_CODE}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

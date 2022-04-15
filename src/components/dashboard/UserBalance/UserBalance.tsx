import { DisplayPrice } from "components/DisplayPrice";
import {
  BASE_CURRENCY_CODE,
  Decimals,
  MINIMETIS_CONTRACT_ADDRESS,
} from "config";
import { useGetWalletDetails } from "queries";
import { useGetDividendShare } from "queries/distributor";
import { useGetTokenPrice } from "queries/tokens";
import { useTranslation } from "react-i18next";
import { useMultiCallContract } from "utils";
import { styles } from "./styles";

export const UserBalance: React.FC = () => {
  const { t } = useTranslation(["dashboard"]);
  const { data } = useGetWalletDetails();
  const { data: tokenPrice } = useGetTokenPrice();
  const { data: dividendShare } = useGetDividendShare();

  const { data: userBalanceData } = useMultiCallContract(
    "userBalance",
    [
      {
        address: MINIMETIS_CONTRACT_ADDRESS,
        method: "balanceOf",
        params: [data?.address!],
      },
    ],
    { enabled: Boolean(data?.address) }
  );

  return (
    <div css={styles}>
      <h2>{t("myMiniMetis")}</h2>
      <div className="wrapper">
        <div>
          <span className="title">{t("myMiniMetisBalance")}</span>
          <span className="token-value">
            <DisplayPrice price={userBalanceData} />
          </span>
          <div className="base-value">
            <span>
              <DisplayPrice
                price={userBalanceData}
                baseFactor={tokenPrice?.miniMetis}
                isBasePrice
              />
            </span>
            <span className="base-value-symbol">{BASE_CURRENCY_CODE}</span>
          </div>
        </div>
        <div>
          <span className="title percentage-title">
            {t("yourDividendSharePercentage")}
          </span>
          <div className="percentage-value">
            <span>
              {t("number", { value: dividendShare?.sharePercentage })}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

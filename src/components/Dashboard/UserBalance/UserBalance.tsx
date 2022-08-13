import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";
import { BASE_CURRENCY_CODE, MINIMETIS_CONTRACT_ADDRESS } from "config";
import { useGetWalletDetails } from "queries";
import { useGetDividendShare } from "queries/distributor";
import { useGetTokenPrice } from "queries/tokens";
import { useMultiCallContract } from "utils";

import { styles } from "./styles";

export const UserBalance: React.FC = () => {
  const { t } = useTranslation(["dashboard"]);
  const { data: walletDetails } = useGetWalletDetails();
  const { data: tokenPrice } = useGetTokenPrice();
  const { data: dividendShare } = useGetDividendShare();

  const { data: userBalanceData } = useMultiCallContract(
    "userBalance",
    [
      {
        address: MINIMETIS_CONTRACT_ADDRESS,
        method: "balanceOf",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [walletDetails?.address!],
      },
    ],
    { enabled: Boolean(walletDetails?.address) }
  );

  return (
    <div css={styles}>
      <h2>{t("myMiniMetis")}</h2>
      <div className="wrapper">
        <div>
          <span className="title">{t("myMiniMetisBalance")}</span>
          <span className="token-value">
            <DisplayPrice price={userBalanceData} />
            <span className="token-value-expanded">
              <DisplayPrice price={userBalanceData} isCompact={false} />
            </span>
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
              {t("number", { value: dividendShare?.userData?.sharePercentage })}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

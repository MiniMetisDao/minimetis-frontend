import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/shared/DisplayPrice";
import { BASE_CURRENCY_CODE, MINIME_CONTRACT_ADDRESS } from "config";
import { useGetDividendShare } from "queries/distributor";
import { useGetMinimeConstants } from "queries/minimeConstants";
import { useGetTokenPrice } from "queries/tokens";
import { useGetWalletDetails } from "queries/walletDetails";
import { useMultiCallContract } from "utils/multicall";

import { styles } from "./styles";

export const UserBalance: React.FC = () => {
  const { t } = useTranslation(["dashboard"]);
  const { data: minimeConstants } = useGetMinimeConstants();
  const { data: walletDetails } = useGetWalletDetails();
  const { data: tokenPrice } = useGetTokenPrice();
  const { data: dividendShare } = useGetDividendShare();

  const { data: userBalanceData } = useMultiCallContract<string>(
    ["dashboard", "userBalance"],
    {
      address: MINIME_CONTRACT_ADDRESS,
      method: "balanceOf",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      params: [walletDetails?.address!],
    },
    { enabled: Boolean(walletDetails?.address) }
  );

  return (
    <div css={styles}>
      <h2>{t("myMiniMetis")}</h2>
      <div className="wrapper">
        <div>
          <span className="title">{t("myMiniMetisBalance")}</span>
          <span className="token-value">
            <DisplayPrice
              amount={userBalanceData}
              decimals={minimeConstants?.decimals}
              isCompact
            />
            <span className="token-value-expanded">
              <DisplayPrice
                amount={userBalanceData}
                decimals={minimeConstants?.decimals}
                roundingDecimal={0}
              />
            </span>
          </span>
          <div className="base-value">
            <span>
              <DisplayPrice
                amount={userBalanceData}
                baseFactor={tokenPrice?.MINIME}
                isBasePrice
                decimals={minimeConstants?.decimals}
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
              {t("number", {
                value: dividendShare?.userData?.sharePercentage,
                roundingDecimal: 4,
              })}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

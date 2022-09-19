import { cx } from "@emotion/css";
import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";
import { MINIME_CONTRACT_ADDRESS_V1, MINIME_CONTRACT_ADDRESS_V2 } from "config";
import { useGetWalletDetails, useMinimeConstants } from "queries";
import { useMultiCallContract } from "utils";

import { TokenUpgradeModal } from "./TokenUpgradeModal";
import { styles } from "./styles";

export const TokenUpgrade: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const [showModal, setShowModal] = React.useState(false);

  const { data: walletDetails } = useGetWalletDetails();
  const { data: minimeConstants } = useMinimeConstants();

  const { data: userBalance } = useMultiCallContract<string>(
    "userBalance",
    {
      address: MINIME_CONTRACT_ADDRESS_V1,
      method: "balanceOf",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      params: [walletDetails?.address!],
    },
    { enabled: Boolean(walletDetails?.address) }
  );

  const { data: userV2Balance } = useMultiCallContract<string>(
    "userBalance",
    {
      address: MINIME_CONTRACT_ADDRESS_V2,
      method: "balanceOf",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      params: [walletDetails?.address!],
    },
    { enabled: Boolean(walletDetails?.address) }
  );

  const handleClick = () => setShowModal(true);

  return (
    <>
      <div css={styles}>
        <div className="wrapper">
          <div className="token-upgrade">
            <div className="mobile-text">
              <h2>{t("miniMetisUpgradeTitle")}</h2>
              <p>{t("miniMetisUpgradeDescription")}</p>
            </div>
            <button
              onClick={handleClick}
              disabled={
                walletDetails?.status !== "CONNECTED" ||
                (userBalance ? BigNumber(userBalance).isEqualTo(0) : true)
              }
              className={cx({
                disabled: walletDetails?.status !== "CONNECTED",
              })}
            >
              {t("upgradeToken")}
            </button>
          </div>
        </div>
        <div className="wrapper">
          <p className="balance-v2">
            <strong>{t("v2Balance")}</strong>
            <DisplayPrice
              amount={userV2Balance}
              decimals={minimeConstants?.decimals}
              roundingDecimal={4}
            />
          </p>
        </div>
      </div>
      {showModal && <TokenUpgradeModal onClose={() => setShowModal(false)} />}
    </>
  );
};

import { cx } from "@emotion/css";
import BigNumber from "bignumber.js";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { DisplayPrice } from "components/DisplayPrice";
import { MINIME_CONTRACT_ADDRESS } from "config";
import {
  useGetWalletDetails,
  useMinimeConstants,
  useUpgradeToken,
} from "queries";
import { useMultiCallContract } from "utils";

import { styles } from "./styles";

export const TokenUpgrade: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const { data: walletDetails } = useGetWalletDetails();
  const { data: minimeConstants } = useMinimeConstants();

  const { data: userBalance } = useMultiCallContract<string>(
    "userBalance",
    {
      address: MINIME_CONTRACT_ADDRESS,
      method: "balanceOf",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      params: [walletDetails?.address!],
    },
    { enabled: Boolean(walletDetails?.address) }
  );

  const { mutate, isLoading } = useUpgradeToken({
    onTransactionStart: ({ shortHash, explorerUrl }) => {
      toast.loading(
        <Trans
          i18nKey="transactionPending"
          values={{ txHash: shortHash }}
          components={{
            a: <a target="_blank" href={explorerUrl} />,
          }}
        />,
        {
          toastId: "tokenUpgrade",
          closeButton: true,
        }
      );
    },
    onTransactionSuccess: ({ shortHash, explorerUrl }) => {
      toast.update("claimDividend", {
        render: (
          <Trans
            i18nKey="transactionSuccess"
            values={{ txHash: shortHash }}
            components={{
              a: <a target="_blank" href={explorerUrl} />,
            }}
          />
        ),
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 6000,
      });
    },
    onError: (error) => {
      if (error?.code === 4001) {
        toast.error(t("transactionCancelled"));
      } else {
        toast.update("tokenUpgrade", {
          render: t("transactionError"),
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 6000,
        });
      }
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
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
              (userBalance ? BigNumber(userBalance).isEqualTo(0) : true) ||
              isLoading
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
            amount={userBalance}
            decimals={minimeConstants?.decimals}
            roundingDecimal={0}
          />
        </p>
      </div>
    </div>
  );
};

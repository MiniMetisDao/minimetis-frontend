import { cx } from "@emotion/css";
import BigNumber from "bignumber.js";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { DisplayPrice } from "components/DisplayPrice";
import { MINIME_CONTRACT_ADDRESS_V1, MINIME_CONTRACT_ADDRESS_V2 } from "config";
import {
  useGetUpgradeTokenAllowance,
  useGetWalletDetails,
  useMinimeConstants,
  useUpgradeToken,
  useUpgradeTokenApproval,
} from "queries";
import { useMultiCallContract } from "utils";

import { styles } from "./styles";

export const TokenUpgrade: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const { data: walletDetails } = useGetWalletDetails();
  const { data: minimeConstants } = useMinimeConstants();
  const { data: allowance } = useGetUpgradeTokenAllowance();

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

  const hasApproved =
    allowance &&
    (userBalance
      ? BigNumber(allowance).isGreaterThanOrEqualTo(userBalance)
      : false);

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
      toast.update("tokenUpgrade", {
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
      } else if (error?.code === 0) {
        //TODO: need better error handling
        toast.error(t("transactionError"));
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

  const { mutate: approvalMutate, isLoading: isApprovalLoading } =
    useUpgradeTokenApproval({
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
            toastId: "tokenUpgradeApproval",
            closeButton: true,
          }
        );
      },
      onTransactionSuccess: ({ shortHash, explorerUrl }) => {
        mutate();
        toast.update("tokenUpgradeApproval", {
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
          toast.update("tokenUpgradeApproval", {
            render: t("transactionError"),
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 6000,
          });
        }
      },
    });

  const handleClick = () => {
    if (hasApproved) {
      mutate();
    } else {
      approvalMutate();
    }
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
              isLoading ||
              isApprovalLoading
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
  );
};

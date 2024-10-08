import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { DisplayPrice } from "components/shared/DisplayPrice";
import { BASE_CURRENCY_CODE } from "config";
import { useClaimDividend, useGetDividendShare } from "queries/distributor";
import { useGetTokenPrice } from "queries/tokens";
import { useGetWalletDetails } from "queries/walletDetails";
import { getHumanReadableAmount } from "utils/common";

import { styles } from "./styles";

export const UserDividends: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const { data: dividendShare } = useGetDividendShare();
  const { data: walletDetails } = useGetWalletDetails();
  const { data: tokenPrice } = useGetTokenPrice();

  const { mutate, isLoading } = useClaimDividend({
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
          toastId: "claimDividend",
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
        toast.update("claimDividend", {
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

  const isClaimButtonDisabled = React.useMemo(() => {
    if (walletDetails?.status === "CONNECTED") {
      const dividend = dividendShare?.userData?.unclaimedDividend;

      return (
        !dividend?.amount ||
        getHumanReadableAmount(dividend.amount, dividend.decimals).isEqualTo(0)
      );
    }

    return false; // Enable button for non connected user to trigger connection
  }, [dividendShare, walletDetails]);

  return (
    <div css={styles}>
      <div className="wrapper">
        <div className="dividend">
          <span className="title">
            <Trans
              i18nKey="dashboard:myClaimedDividends"
              values={{ tokenName: "Metis" }}
              components={{ strong: <strong /> }}
            />
          </span>
          <span className="token-value">
            <DisplayPrice
              amount={dividendShare?.userData?.claimedDividend.amount}
              decimals={dividendShare?.userData?.claimedDividend.decimals}
              roundingDecimal={4}
            />
          </span>
          <div className="base-value">
            <span>
              <DisplayPrice
                amount={dividendShare?.userData?.claimedDividend.amount}
                decimals={dividendShare?.userData?.claimedDividend.decimals}
                baseFactor={tokenPrice?.METIS}
                isBasePrice
              />
            </span>
            <span className="base-value-symbol">{BASE_CURRENCY_CODE}</span>
          </div>
        </div>
      </div>
      <div className="dividend">
        <span className="title">
          <Trans
            i18nKey="dashboard:myUnclaimedDividends"
            values={{ tokenName: "Metis" }}
            components={{ strong: <strong /> }}
          />
        </span>
        <span className="token-value">
          <DisplayPrice
            amount={dividendShare?.userData?.unclaimedDividend.amount}
            decimals={dividendShare?.userData?.unclaimedDividend.decimals}
            roundingDecimal={4}
          />
        </span>
        <div className="base-value">
          <span>
            <DisplayPrice
              amount={dividendShare?.userData?.unclaimedDividend.amount}
              decimals={dividendShare?.userData?.unclaimedDividend.decimals}
              baseFactor={tokenPrice?.METIS}
              isBasePrice
            />
          </span>
          <span className="base-value-symbol">{BASE_CURRENCY_CODE}</span>
        </div>
      </div>
      <div className="claim">
        <button onClick={handleClick} disabled={isClaimButtonDisabled}>
          {isLoading ? t("claiming") : t("claimNow")}
        </button>
      </div>

      <div className="info">
        <p>
          <Trans
            i18nKey="dashboard:dividendInfo"
            values={{ tokenName: "Metis", minimumAmount: "0.1" }}
            components={{ strong: <strong /> }}
          />
        </p>
      </div>
    </div>
  );
};

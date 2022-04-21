import { cx } from "@emotion/css";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { DisplayPrice } from "components/DisplayPrice";
import { BASE_CURRENCY_CODE, EXPLORER_URL } from "config";
import { useGetWalletDetails } from "queries";
import { useGetDividendShare } from "queries/distributor";
import { useClaimDividend } from "queries/distributor/useClaimDividend";
import { useGetTokenPrice } from "queries/tokens";
import { getShortTransactionHash } from "utils";

import { styles } from "./styles";

export const UserDividends: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const [claimInProgress, setClaimInProgress] = React.useState(false);

  const { data: dividendShare } = useGetDividendShare();
  const { data: walletDetails } = useGetWalletDetails();
  const { data: tokenPrice } = useGetTokenPrice();

  const { mutate, isError, error, data: claimDividend } = useClaimDividend();

  const handleClick = () => {
    mutate();
    setClaimInProgress(true);
  };

  React.useEffect(() => {
    if (isError && error) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (error as any).code! === 4001
          ? t("transactionCancelled")
          : t("transactionError")
      );
      setClaimInProgress(false);
    }
  }, [error, isError, t]);

  React.useEffect(() => {
    const { txHash, txReceipt } = claimDividend || {};
    if (!txHash) return;
    setClaimInProgress(true);

    const shortHash = getShortTransactionHash(txHash);
    if (txHash) {
      toast.loading(
        <Trans
          i18nKey="transactionPending"
          values={{ txHash: shortHash }}
          components={{
            a: <a target="_blank" href={`${EXPLORER_URL}tx/${txHash}`} />,
          }}
        />,
        {
          toastId: "claimDividend",
          closeButton: true,
        }
      );
    }
    if (txReceipt) {
      txReceipt
        .then(() => {
          toast.update("claimDividend", {
            render: (
              <Trans
                i18nKey="transactionSuccess"
                values={{ txHash: shortHash }}
                components={{
                  a: <a target="_blank" href={`${EXPLORER_URL}tx/${txHash}`} />,
                }}
              />
            ),
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 6000,
          });
        })
        .catch((error: any) => {
          toast.update("claimDividend", {
            render:
              error?.code === 4001
                ? t("transactionCancelled")
                : t("transactionError"),
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 6000,
          });
        })
        .finally(() => setClaimInProgress(false));
    }
  }, [claimDividend, t]);

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
            <DisplayPrice price={dividendShare?.userData?.claimedDividend} />
          </span>
          <div className="base-value">
            <span>
              <DisplayPrice
                price={dividendShare?.userData?.claimedDividend}
                baseFactor={tokenPrice?.metis}
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
          <DisplayPrice price={dividendShare?.userData?.unclaimedDividend} />
        </span>
        <div className="base-value">
          <span>
            <DisplayPrice
              price={dividendShare?.userData?.unclaimedDividend}
              baseFactor={tokenPrice?.metis}
              isBasePrice
            />
          </span>
          <span className="base-value-symbol">{BASE_CURRENCY_CODE}</span>
        </div>
      </div>
      <div className="claim">
        <button
          onClick={handleClick}
          disabled={
            walletDetails?.status !== "CONNECTED" ||
            Number(dividendShare?.userData?.unclaimedDividend) === 0
          }
          className={cx({
            disabled: walletDetails?.status !== "CONNECTED",
          })}
        >
          {claimInProgress ? t("claiming") : t("claimNow")}
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

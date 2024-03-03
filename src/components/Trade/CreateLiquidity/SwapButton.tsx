import BigNumber from "bignumber.js";
import { type Trade, TradeType } from "minime-sdk";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/shared/Button";
import { ConnectButton } from "components/shared/Connect";
import { TRADE_SETTINGS } from "config";
import { SWAP_METHODS } from "config/trade/constants";
import {
  useGetTokenAllowance,
  useTokenApproval,
  useTokenSwap,
} from "queries/trade";
import { useCreatePair } from "queries/trade/useCreatePair";
import { useGetWalletDetails } from "queries/walletDetails";
import { getAmount, getDeadlineTimestamp } from "utils/common";
import { useStorage } from "utils/storage";

import { type SwapToken } from "./types";

type SwapButtonProps = {
  hasInputError: boolean;
  pairTokens: SwapToken[];
  onSuccess?: () => void;
};

export const SwapButton: React.FC<SwapButtonProps> = ({
  hasInputError,
  pairTokens,
  onSuccess,
}) => {
  const { t } = useTranslation("trade");

  const { data: walletDetails } = useGetWalletDetails();

  const transactionDeadline = useStorage().get(
    "transactionDeadline",
    TRADE_SETTINGS.deadline
  );

  const { mutate: approvalMutate, isLoading: isApprovalLoading } =
    useTokenApproval({
      onTransactionStart: ({ shortHash, explorerUrl }) => {
        toast.loading(
          <Trans
            i18nKey="transactionPending"
            values={{ txHash: shortHash }}
            components={{
              a: <a target="_blank" href={explorerUrl} />,
            }}
          />,
          { toastId: "approval", closeButton: true }
        );
      },
      onTransactionSuccess: ({ shortHash, explorerUrl }) => {
        if (onSuccess) onSuccess();
        toast.update("approval", {
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
          toast.update("approval", {
            render: t("transactionError"),
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 6000,
          });
        }
      },
    });

  const { mutate, isLoading } = useCreatePair({
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
          toastId: "swap",
          closeButton: true,
        }
      );
    },
    onTransactionSuccess: ({ shortHash, explorerUrl }) => {
      toast.update("swap", {
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
      console.log(error);
      if (error?.code === 4001) {
        toast.error(t("transactionCancelled"));
      } else if (error?.code === 0) {
        toast.error(t("transactionError"));
      } else {
        toast.update("swap", {
          render: t("transactionError"),
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 6000,
        });
      }
    },
  });

  const handleSwapClick = () => {
    const method = "createPair";

    const params = [pairTokens[0].token.address, pairTokens[1].token.address];

    mutate({ method, params });
  };

  if (walletDetails?.status !== "CONNECTED") {
    return <ConnectButton />;
  }

  return (
    <Button disabled={hasInputError || isLoading} onClick={handleSwapClick}>
      {!isLoading ? "CREATE PAIR" : "CREATING"}
    </Button>
  );
};

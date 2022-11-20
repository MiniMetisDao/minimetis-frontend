import BigNumber from "bignumber.js";
import { Trade, TradeType } from "minime-sdk";
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
import { useGetWalletDetails } from "queries/walletDetails";
import { getAmount, getDeadlineTimestamp } from "utils";
import { useStorage } from "utils/storage";

import { SwapToken } from "./types";

type SwapButtonProps = {
  hasInputError: boolean;
  fromToken: SwapToken;
  userEnteredToken: SwapToken;
  estimatedToken: SwapToken;
  slippageAdjustedInputAmount?: string;
  slippageAdjustedOutputAmount?: string;
  trade?: Trade;
  onSuccess?: () => void;
};

export const SwapButton: React.FC<SwapButtonProps> = ({
  hasInputError,
  fromToken,
  userEnteredToken,
  estimatedToken,
  slippageAdjustedInputAmount = "",
  slippageAdjustedOutputAmount = "",
  trade,
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

  const { data: allowance } = useGetTokenAllowance(fromToken.token.address);

  const { mutate: swapMutate, isLoading: isSwapLoading } = useTokenSwap({
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
      console.log("error", error);
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
    const method =
      trade?.tradeType === TradeType.EXACT_INPUT
        ? SWAP_METHODS.EXACT_INPUT
        : SWAP_METHODS.EXACT_OUTPUT;

    const amountNeeded = getAmount(
      userEnteredToken.amount,
      userEnteredToken.token.decimals
    ).toFixed();

    const amountSwappable = getAmount(
      trade?.tradeType === TradeType.EXACT_INPUT
        ? slippageAdjustedOutputAmount
        : slippageAdjustedInputAmount,
      trade?.tradeType === TradeType.EXACT_INPUT
        ? estimatedToken.token?.decimals
        : userEnteredToken?.token?.decimals
    ).toFixed();

    if (
      !trade ||
      !trade.route.path.length ||
      amountNeeded === "" ||
      amountSwappable === "" ||
      !walletDetails?.address
    ) {
      return;
    }

    const params = [
      amountNeeded,
      amountSwappable,
      trade.route.path.map((token) => token.address),
      walletDetails?.address,
      getDeadlineTimestamp(transactionDeadline as number),
    ];

    swapMutate({ method, params });
  };

  const handleApprovalClick = () => {
    approvalMutate({
      tokenAddress: fromToken.token?.address,
    });
  };

  const hasApproved =
    allowance &&
    (fromToken.amount
      ? BigNumber(allowance).isGreaterThanOrEqualTo(
          getAmount(fromToken.amount, fromToken.token.decimals)
        )
      : false);

  if (walletDetails?.status !== "CONNECTED") {
    return <ConnectButton />;
  }

  return !hasInputError && !hasApproved ? (
    <Button
      disabled={hasInputError || isApprovalLoading}
      onClick={handleApprovalClick}
    >
      {!isApprovalLoading ? t("approve") : t("approving")}
    </Button>
  ) : (
    <Button disabled={hasInputError || isSwapLoading} onClick={handleSwapClick}>
      {!isSwapLoading ? t("swap") : t("swapping")}
    </Button>
  );
};

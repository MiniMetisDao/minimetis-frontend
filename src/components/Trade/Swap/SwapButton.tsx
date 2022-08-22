import { Token as SdkToken, Trade, TradeType } from "@netswap/sdk";
import BigNumber from "bignumber.js";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/Button";
import { ConnectButton } from "components/Connect";
import { TRADE_SETTINGS } from "config";
import { useGetWalletDetails } from "queries";
import { useGetTokenAllowance } from "queries/trade/useGetTokenAllowance";
import { useTokenApproval } from "queries/trade/useTokenApproval";
import { useTokenSwap } from "queries/trade/useTokenSwap";
import { getAmount, getDeadlineTimestamp } from "utils";
import { useStorage } from "utils/storage";

import { SWAP_METHODS } from "./constants";
import { SwapToken } from "./types";

type SwapButtonProps = {
  hasInputError: boolean;
  fromToken: SwapToken;
  userEnteredToken: SwapToken;
  estimatedToken: SwapToken;
  slippageAdjustedInputAmount?: string;
  slippageAdjustedOutputAmount?: string;
  trade?: Trade;
};

export const SwapButton: React.FC<SwapButtonProps> = ({
  hasInputError,
  fromToken,
  userEnteredToken,
  estimatedToken,
  slippageAdjustedInputAmount = "",
  slippageAdjustedOutputAmount = "",
  trade,
}) => {
  const { t } = useTranslation("trade");

  const { data: walletDetails } = useGetWalletDetails();

  const [transactionDeadline] = useStorage(
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
          {
            toastId: "approval",
            closeButton: true,
          }
        );
      },
      onTransactionSuccess: ({ shortHash, explorerUrl }) => {
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

  const { data: allowance } = useGetTokenAllowance({
    token: fromToken.token,
  });

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
      if (error?.code === 4001) {
        toast.error(t("transactionCancelled"));
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
    ).toString();

    const amountSwappable = getAmount(
      trade?.tradeType === TradeType.EXACT_INPUT
        ? slippageAdjustedOutputAmount
        : slippageAdjustedInputAmount,
      trade?.tradeType === TradeType.EXACT_INPUT
        ? estimatedToken.token?.decimals
        : userEnteredToken?.token?.decimals
    ).toString();

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
      trade.route.path.map((token: SdkToken) => token.address),
      walletDetails?.address,
      getDeadlineTimestamp(transactionDeadline as number),
    ];

    swapMutate({ method, params });
  };

  const handleApprovalClick = () => {
    approvalMutate({
      tokenAddress: userEnteredToken.token?.address,
    });
  };

  const hasApproved =
    allowance &&
    (fromToken.amount
      ? BigNumber(allowance).isGreaterThanOrEqualTo(
          getAmount(fromToken.amount, fromToken.token.decimals)
        )
      : false);

  if (!hasInputError && !hasApproved) {
    return (
      <Button
        disabled={hasInputError || isApprovalLoading}
        onClick={handleApprovalClick}
      >
        {!isApprovalLoading ? t("approve") : t("approving")}
      </Button>
    );
  }

  return walletDetails?.status === "CONNECTED" ? (
    <Button disabled={hasInputError} onClick={handleSwapClick}>
      {!isSwapLoading ? t("swap") : t("swapping")}
    </Button>
  ) : (
    <ConnectButton />
  );
};

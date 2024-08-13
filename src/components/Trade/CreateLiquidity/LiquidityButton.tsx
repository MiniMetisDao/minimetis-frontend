import BigNumber from "bignumber.js";
import { type Trade } from "minime-sdk";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/shared/Button";
import { ConnectButton } from "components/shared/Connect";
import { TRADE_SETTINGS } from "config";
import { useGetTokenAllowance, useTokenApproval } from "queries/trade";
import { useAddLiquidity } from "queries/trade/useAddLiquidity";
import { useGetWalletDetails } from "queries/walletDetails";
import { type SwapToken } from "types/common";
import { getAmount, getDeadlineTimestamp, getMinAmount } from "utils/common";
import { useStorage } from "utils/storage";

import { isMetis } from "./utils/methods";

type SwapButtonProps = {
  hasInputError: boolean;
  fromToken: SwapToken;
  toToken: SwapToken;
  userEnteredToken: SwapToken;
  estimatedToken: SwapToken;
  slippageAdjustedInputAmount?: string;
  slippageAdjustedOutputAmount?: string;
  trade?: Trade;
  onSuccess?: () => void;
};

export const LiquidityButton: React.FC<SwapButtonProps> = ({
  hasInputError,
  fromToken,
  toToken,
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

  const { data: allowanceFrom } = useGetTokenAllowance(fromToken.token.address);
  const { data: allowanceTo } = useGetTokenAllowance(toToken.token.address);

  const { mutate: addLpMutate, isLoading: isSwapLoading } = useAddLiquidity({
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
          toastId: "liquidity",
          closeButton: true,
        }
      );
    },
    onTransactionSuccess: ({ shortHash, explorerUrl }) => {
      toast.update("liquidity", {
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
        toast.error(t("transactionError"));
      } else {
        toast.update("liquidity", {
          render: t("transactionError"),
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 6000,
        });
      }
    },
  });

  const handleAddLiquidityClick = () => {
    if (!walletDetails) return;
    if (!walletDetails.address) return;

    const isMetisFrom = isMetis(fromToken.token.address);
    const isMetisTo = isMetis(toToken.token.address);

    const method =
      isMetisFrom || isMetisTo ? "addLiquidityMetis" : "addLiquidity";

    const amountNeededFrom = getAmount(
      fromToken.amount,
      fromToken.token.decimals
    ).toFixed();

    const amountNeededTo = getAmount(
      toToken.amount,
      toToken.token.decimals
    ).toFixed();

    const amountMinFrom = getMinAmount(amountNeededFrom);
    const amountMinTo = getMinAmount(amountNeededTo);

    const deadline = getDeadlineTimestamp(transactionDeadline as number);
    if (method === "addLiquidityMetis") {
      const { token } = !isMetisFrom ? fromToken : toToken;

      const amountTokenDesired = !isMetisFrom
        ? amountNeededFrom
        : amountNeededTo;

      const value = isMetisFrom ? amountNeededFrom : amountNeededTo;
      const AmountTokenMin = !isMetisFrom ? amountMinFrom : amountMinTo;

      const params = [
        token.address,
        amountTokenDesired,
        AmountTokenMin,
        isMetisFrom ? amountMinFrom : amountMinTo,
        walletDetails.address,
        deadline,
      ];

      addLpMutate({ method, params, value });
    } else {
      const params = [
        fromToken.token.address,
        toToken.token.address,
        amountNeededFrom,
        amountNeededTo,
        amountMinFrom,
        amountMinTo,
        walletDetails.address,
        deadline,
      ];

      addLpMutate({ method, params });
    }
  };

  const hasApprovedFrom =
    allowanceFrom &&
    (fromToken.amount
      ? BigNumber(allowanceFrom).isGreaterThanOrEqualTo(
          getAmount(fromToken.amount, fromToken.token.decimals)
        )
      : false);

  const hasApprovedTo =
    allowanceTo &&
    (toToken.amount
      ? BigNumber(allowanceTo).isGreaterThanOrEqualTo(
          getAmount(toToken.amount, toToken.token.decimals)
        )
      : false);

  const handleApprovalClick = () => {
    if (!hasApprovedFrom)
      approvalMutate({
        tokenAddress: fromToken.token?.address,
      });

    if (!hasApprovedTo)
      approvalMutate({
        tokenAddress: toToken.token?.address,
      });
  };

  const bothApproved = hasApprovedFrom && hasApprovedTo;

  if (walletDetails?.status !== "CONNECTED") {
    return <ConnectButton />;
  }

  if (!hasInputError && !bothApproved)
    return (
      <Button
        disabled={hasInputError || isApprovalLoading}
        onClick={handleApprovalClick}
      >
        {!isApprovalLoading ? t("approve") : t("approving")}
      </Button>
    );

  return (
    <Button
      disabled={hasInputError || isSwapLoading}
      onClick={handleAddLiquidityClick}
    >
      {!isSwapLoading ? "Add" : "Adding"}
    </Button>
  );
};

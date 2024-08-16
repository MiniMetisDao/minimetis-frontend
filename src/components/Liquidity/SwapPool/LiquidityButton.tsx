import BigNumber from "bignumber.js";
import { type Token } from "minime-sdk";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/shared/Button";
import { ConnectButton } from "components/shared/Connect";
import { TRADE_SETTINGS } from "config";
import { useGetTokenAllowance, useTokenApproval } from "queries/trade";
import { useAddLiquidity } from "queries/trade/useAddLiquidity";
import { useGetWalletDetails } from "queries/walletDetails";
import { Field, type ParsedAmounts } from "types/common";
import {
  calculateSlippageAmount,
  getDeadlineTimestamp,
  isMetis,
} from "utils/common";
import { useStorage } from "utils/storage";

type SwapButtonProps = {
  hasInputError: boolean;
  fromToken: Token;
  toToken: Token;
  fromInput: string;
  toInput: string;
  slippage: number;
  noLiquidity: boolean;
  parsedAmounts: ParsedAmounts;
  onSuccess?: () => void;
};

export const LiquidityButton: React.FC<SwapButtonProps> = ({
  hasInputError,
  fromToken,
  toToken,
  fromInput,
  slippage,
  toInput,
  noLiquidity,
  parsedAmounts,
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

  const { data: allowanceFrom } = useGetTokenAllowance(fromToken.address);
  const { data: allowanceTo } = useGetTokenAllowance(toToken.address);

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

    const isMetisFrom = isMetis(fromToken.address);
    const isMetisTo = isMetis(toToken.address);

    const method =
      isMetisFrom || isMetisTo ? "addLiquidityMetis" : "addLiquidity";

    const amountNeededFrom = parsedAmounts[Field.INPUT].raw.toString();
    const amountNeededTo = parsedAmounts[Field.OUTPUT].raw.toString();

    console.log({ amountNeededFrom, amountNeededTo });

    const amountsMin = {
      [Field.INPUT]: calculateSlippageAmount(
        parsedAmounts[Field.INPUT],
        noLiquidity ? 0 : slippage
      )[0],
      [Field.OUTPUT]: calculateSlippageAmount(
        parsedAmounts[Field.OUTPUT],
        noLiquidity ? 0 : slippage
      )[0],
    };

    console.log({ amountNeededFrom, amountNeededTo, amountsMin });

    const amountMinFrom = amountsMin[Field.INPUT].toString();
    const amountMinTo = amountsMin[Field.OUTPUT].toString();

    const deadline = getDeadlineTimestamp(transactionDeadline as number);
    if (method === "addLiquidityMetis") {
      const token = !isMetisFrom ? fromToken : toToken;

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
        fromToken.address,
        toToken.address,
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
    (fromInput
      ? BigNumber(allowanceFrom).isGreaterThanOrEqualTo(
          parsedAmounts[Field.INPUT].raw.toString()
        )
      : false);

  const hasApprovedTo =
    allowanceTo &&
    (toInput
      ? BigNumber(allowanceTo).isGreaterThanOrEqualTo(
          parsedAmounts[Field.OUTPUT].raw.toString()
        )
      : false);

  const handleApprovalClick = () => {
    if (!hasApprovedFrom)
      approvalMutate({
        tokenAddress: fromToken.address,
      });

    if (!hasApprovedTo)
      approvalMutate({
        tokenAddress: toToken.address,
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

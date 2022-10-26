import BigNumber from "bignumber.js";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/Button";
import { ConnectButton } from "components/Connect";
import { TRADE_SETTINGS } from "config";
import { useGetWalletDetails } from "queries";
import { useGetLiquidityPoolReserves } from "queries/trade/useGetLiquidityPoolReserves";
import { useGetTokenAllowance } from "queries/trade/useGetTokenAllowance";
import { useRemoveLiquidity } from "queries/trade/useRemoveLiquidity";
import { useTokenApproval } from "queries/trade/useTokenApproval";
import { getDeadlineTimestamp, getSlippageTolerance } from "utils";
import { useStorage } from "utils/storage";
import { get } from "utils/storage/storage";

type RemoveLiquidityButtonProps = {
  hasInputError: boolean;
  pairAddress: string;
  amount: string;
};

export const RemoveLiquidityButton: React.FC<RemoveLiquidityButtonProps> = ({
  hasInputError,
  pairAddress,
  amount,
}) => {
  const { t } = useTranslation("trade");

  const storedSlippage = get(
    "slippageTolerance",
    TRADE_SETTINGS.slippage
  ) as number;

  const allowedSlippage = getSlippageTolerance(storedSlippage);
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

  const { data: allowance } = useGetTokenAllowance(pairAddress);
  const { data: reserves } = useGetLiquidityPoolReserves(pairAddress);

  const reservesData = reserves
    ? {
        tokenA: reserves.token0,
        tokenB: reserves.token1,
        tokenABalance: reserves.getReserves.split(",")[0],
        tokenBBalance: reserves.getReserves.split(",")[1],
        totalSupply: reserves.totalSupply,
      }
    : null;

  const { mutate: removeLiquidityMutate, isLoading: isremoveLiquidityLoading } =
    useRemoveLiquidity({
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
    const method = "removeLiquidity";

    const amountToRemove = amount;
    const slippageAdjustedFactor = (10000 - allowedSlippage) / 10000;
    console.log("slippageAdjustedFactor", slippageAdjustedFactor);

    const amountRatio = reservesData
      ? BigNumber(amount).div(BigNumber(reservesData.totalSupply))
      : BigNumber("0");

    const amountAMin = reservesData
      ? amountRatio
          .multipliedBy(BigNumber(reservesData.tokenABalance))
          .multipliedBy(slippageAdjustedFactor)
      : BigNumber("0");

    const amountBMin = reservesData
      ? amountRatio
          .multipliedBy(BigNumber(reservesData.tokenBBalance))
          .multipliedBy(slippageAdjustedFactor)
      : BigNumber("0");

    if (amountToRemove === "" || !walletDetails?.address) {
      return;
    }

    const params = [
      reservesData?.tokenA,
      reservesData?.tokenB,
      amountToRemove,
      amountAMin.toFixed(0),
      amountBMin.toFixed(0),
      walletDetails?.address,
      getDeadlineTimestamp(transactionDeadline as number),
    ];

    removeLiquidityMutate({ method, params });
  };

  const handleApprovalClick = () => {
    approvalMutate({
      tokenAddress: pairAddress,
    });
  };

  const hasApproved =
    allowance &&
    (amount ? BigNumber(allowance).isGreaterThanOrEqualTo(amount) : false);

  if (walletDetails?.status !== "CONNECTED") {
    return <ConnectButton />;
  }
  const isDataLoading = Boolean(reservesData);

  return !hasInputError && !hasApproved ? (
    <Button
      disabled={hasInputError || isApprovalLoading}
      onClick={handleApprovalClick}
    >
      {!isApprovalLoading ? t("approve") : t("approving")}
    </Button>
  ) : (
    <Button
      disabled={hasInputError || !isDataLoading}
      onClick={handleSwapClick}
    >
      {!isremoveLiquidityLoading ? "remove liquidity" : "removing liquidity"}
    </Button>
  );
};

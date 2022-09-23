import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/Button";
import { useTokenApproval } from "queries/trade/useTokenApproval";
import { Token } from "types/common";

type ApprovalButton = {
  hasInputError: boolean;
  token: Token;
  tokenAmount?: string;
  onSuccess: () => void;
};

export const ApprovalButton: React.FC<ApprovalButton> = ({
  hasInputError,
  token,
  tokenAmount,
  onSuccess,
}) => {
  const { t } = useTranslation("trade");

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
            toastId: "approval-modify",
            closeButton: true,
          }
        );
      },
      onTransactionSuccess: ({ shortHash, explorerUrl }) => {
        toast.update("approval-modify", {
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
        onSuccess();
      },
      onError: (error) => {
        if (error?.code === 4001) {
          toast.error(t("transactionCancelled"));
        } else {
          toast.update("approval-modify", {
            render: t("transactionError"),
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 6000,
          });
        }
      },
    });

  const handleApprovalClick = () => {
    approvalMutate({ tokenAddress: token?.address, tokenAmount });
  };

  return (
    <Button
      disabled={hasInputError || isApprovalLoading}
      onClick={handleApprovalClick}
    >
      {!isApprovalLoading ? t("approve") : t("approving")}
    </Button>
  );
};

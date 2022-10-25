import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { AiOutlineEdit } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

import { DisplayPrice } from "components/DisplayPrice";
import { IconButton } from "components/IconButton";
import { Input } from "components/Input";
import { Tooltip } from "components/Tooltip";
import { APPROVAL_MAX_EDIT } from "config";
import { useGetTokenAllowance } from "queries/trade/useGetTokenAllowance";
import { useTokenApproval } from "queries/trade/useTokenApproval";
import { Token } from "types/common";
import {
  getFormattedAmount,
  getFormattedAmountRounded,
  getHumanReadableAmount,
} from "utils";

import { ApprovalEditModal } from "../ApprovalEditModal";
import { SelectTokenModal } from "../SelectTokenModal";

import { tokenInputStyles } from "./styles";

type TokenInputProps = {
  amount?: string;
  balance?: string;
  token: Token;
  from?: boolean;
  estimated?: boolean;
  onChange: (input: string) => void;
  onTokenChange: (token: Token) => void;
};
export const TokenInput: React.FC<TokenInputProps> = ({
  amount = "",
  balance = "0",
  token,
  from = false,
  estimated = false,
  onChange,
  onTokenChange,
}) => {
  const { t } = useTranslation(["common", "trade"]);

  const [showTokenSelector, setShowTokenSelector] = React.useState(false);

  const [showApprovalEditModal, setShowApprovalEditModal] =
    React.useState(false);

  const { data: allowance } = useGetTokenAllowance(token.address);

  const { mutate: approvalMutate } = useTokenApproval({
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
          toastId: "approval-revoke",
          closeButton: true,
        }
      );
    },
    onTransactionSuccess: ({ shortHash, explorerUrl }) => {
      toast.update("approval-revoke", {
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
        toast.update("approval-revoke", {
          render: t("transactionError"),
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 6000,
        });
      }
    },
  });

  const handleChange = (input: string) => onChange(input);

  const formattedBalance = getFormattedAmount(token, balance);

  const handleMaxClick = () => onChange(formattedBalance);
  const handleTokenSelectorClick = () => setShowTokenSelector(true);
  const handleApprovalEditClick = () => setShowApprovalEditModal(true);

  const handleApprovalRevokeClick = () =>
    approvalMutate({
      tokenAddress: token.address,
      tokenAmount: "0",
    });

  const handleTokenSelect = (token: Token) => {
    onTokenChange(token);
    setShowTokenSelector(false);
  };

  const isMaxAllowed =
    allowance &&
    getHumanReadableAmount(allowance, token.decimals).isGreaterThanOrEqualTo(
      APPROVAL_MAX_EDIT
    );

  return (
    <>
      <div css={tokenInputStyles({ from })}>
        <div className="input-title-wrapper">
          <span>
            {from ? t("trade:from") : t("trade:to")}{" "}
            {estimated && t("trade:estimated")}
          </span>
          <span>
            {t("balance")} {getFormattedAmountRounded(token, balance)}
          </span>
        </div>
        <div className="input-field-wrapper">
          <Input
            name="input"
            value={amount}
            placeholder="0.0"
            onChange={handleChange}
          />
          {formattedBalance !== amount && from && (
            <button className="max-btn" onClick={handleMaxClick}>
              {t("trade:max")}
            </button>
          )}
          <button
            className="token-selector-btn"
            onClick={handleTokenSelectorClick}
          >
            {token ? (
              <>
                <img src={token.logoURI} /> {token.symbol}
              </>
            ) : (
              <span>{t("trade:selectToken")} </span>
            )}
            <span className="icon">
              <FaChevronDown />
            </span>
          </button>
        </div>
        {from && (
          <div className="input-approval-wrapper">
            {t("trade:approvedAmount")}:{" "}
            {isMaxAllowed ? (
              t("trade:maxAllowed")
            ) : (
              <DisplayPrice
                amount={allowance}
                decimals={token.decimals}
                tokenSymbol={token.symbol}
                isCompact={getHumanReadableAmount(
                  allowance || "",
                  token.decimals
                ).isGreaterThanOrEqualTo("1e6")}
              />
            )}
            {allowance && (
              <Tooltip
                id="editApproval"
                content={t("trade:modifyApprovalAmountInfo", {
                  tokenSymbol: token.symbol,
                })}
              >
                <IconButton onClick={handleApprovalEditClick}>
                  <AiOutlineEdit />
                </IconButton>
              </Tooltip>
            )}
            {allowance !== "0" && (
              <Tooltip
                id="revokeApproval"
                content={t("trade:revokeApprovalInfo", {
                  tokenSymbol: token.symbol,
                })}
              >
                <IconButton onClick={handleApprovalRevokeClick}>
                  <IoIosRemoveCircleOutline />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )}
      </div>

      {showTokenSelector && (
        <SelectTokenModal
          selectedToken={token}
          onSelect={handleTokenSelect}
          onClose={() => setShowTokenSelector(false)}
        />
      )}
      {showApprovalEditModal && (
        <ApprovalEditModal
          token={token}
          onClose={() => setShowApprovalEditModal(false)}
        />
      )}
    </>
  );
};

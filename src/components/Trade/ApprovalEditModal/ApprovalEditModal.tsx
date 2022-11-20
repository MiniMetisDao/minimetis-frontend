import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";

import { InputCompact } from "components/shared/Input";
import { Modal } from "components/shared/Modal";
import { APPROVAL_MAX_EDIT } from "config";
import { useGetTokenAllowance } from "queries/trade";
import { Token } from "types/common";
import { getAmount, getHumanReadableAmount, isValidNumber } from "utils";

import { ApprovalButton } from "./ApprovalButton";
import { styles } from "./styles";

type ApprovalEditModalProps = {
  onClose: () => void;
  token: Token;
};

export const ApprovalEditModal: React.FC<ApprovalEditModalProps> = ({
  onClose,
  token,
}) => {
  const { t } = useTranslation("trade");

  const { data: allowance } = useGetTokenAllowance(token.address);

  const [approvalAmount, setApprovalAmount] = React.useState<string>();

  const approvedAmount = allowance
    ? getHumanReadableAmount(allowance, token.decimals).isGreaterThanOrEqualTo(
        APPROVAL_MAX_EDIT
      )
      ? BigNumber(APPROVAL_MAX_EDIT).toFixed()
      : getHumanReadableAmount(allowance, token.decimals).toFixed()
    : "";

  React.useEffect(() => {
    if (approvalAmount === undefined && allowance) {
      setApprovalAmount(approvedAmount);
    }
  }, [allowance, approvalAmount, approvedAmount]);

  const tokenAmount =
    approvalAmount !== undefined
      ? getAmount(approvalAmount, token.decimals).toFixed()
      : undefined;

  const hasInputError =
    approvalAmount === undefined || !isValidNumber(approvalAmount);

  return (
    <Modal onClose={onClose} title={t("modifyApprovalAmount")}>
      <div css={styles}>
        <div className="field-item">
          <h4>{t("approvalAmount")}</h4>
          {allowance && approvalAmount !== undefined && (
            <InputCompact
              placeholder={approvedAmount}
              value={approvalAmount}
              onChange={(input) => setApprovalAmount(input)}
              suffix={token.symbol}
            />
          )}
        </div>
        <ApprovalButton
          token={token}
          tokenAmount={tokenAmount}
          hasInputError={hasInputError}
          onSuccess={onClose}
        />
      </div>
    </Modal>
  );
};

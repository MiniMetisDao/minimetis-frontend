import React from "react";
import { useTranslation } from "react-i18next";

import { InputCompact } from "components/Input";
import { Modal } from "components/Modal";
import { useGetTokenAllowance } from "queries/trade/useGetTokenAllowance";
import { Token } from "types/common";
import { getAmount, getHumanReadableAmount, isValidNumber } from "utils";

import { ApprovalButton } from "./ApprovalButton";
import { approvalInput, styles } from "./styles";

type ApprovalEditModalProps = {
  onClose: () => void;
  token: Token;
};

export const ApprovalEditModal: React.FC<ApprovalEditModalProps> = ({
  onClose,
  token,
}) => {
  const { t } = useTranslation("trade");

  const { data: allowance } = useGetTokenAllowance({ token });

  const [approvalAmount, setApprovalAmount] = React.useState<string>();

  React.useEffect(() => {
    if (approvalAmount === undefined && allowance) {
      setApprovalAmount(
        getHumanReadableAmount(allowance, token.decimals).toFixed()
      );
    }
  }, [allowance, approvalAmount, token.decimals]);

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
              wrapperCss={approvalInput}
              placeholder={getHumanReadableAmount(
                allowance,
                token.decimals
              ).toFixed()}
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

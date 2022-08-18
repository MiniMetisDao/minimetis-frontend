import React from "react";
import { useTranslation } from "react-i18next";

import { InputButton, InputCompact } from "components/Input";
import { Modal } from "components/Modal";
import { Switch } from "components/Switch";
import { TradeSettings } from "types/common";

import { deadlineInput, styles } from "./styles";

type SettingsModalProps = {
  onClose: () => void;
  onChange: (tradeSettings: TradeSettings) => void;
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onChange,
  onClose,
}) => {
  const { t } = useTranslation("trade");
  const [canMultiHop, setCanMultiHop] = React.useState(true);
  // const [slippageTolerance, setSlippageTolerance] = React.useState("0.5");
  const [transactionDeadline, setTransactionDeadline] = React.useState("15");

  return (
    <Modal onClose={onClose} title={t("trade:tradeSettings")}>
      <div css={styles}>
        <div className="settings-item">
          <h4>{t("slippageTolerance")}</h4>
          <div className="field-wrapper">
            <InputButton
              value="0.5"
              suffix="%"
              onChange={(value) => setSlippageTolerance(value)}
              active={slippageTolerance === "0.5"}
            />
            <InputButton
              value="1.0"
              suffix="%"
              onChange={(value) => setSlippageTolerance(value)}
              active={slippageTolerance === "1.0"}
            />
            <InputCompact
              value={slippageTolerance}
              onChange={(input) => setSlippageTolerance(input)}
              suffix="%"
            />
          </div>
        </div>
        <div className="settings-item">
          <h4>{t("transactionDeadline")}</h4>
          <div className="field-wrapper">
            <InputCompact
              wrapperCss={deadlineInput}
              value={transactionDeadline}
              onChange={(input) => setTransactionDeadline(input)}
              suffix="mins"
            />
          </div>
        </div>
        <div className="settings-item">
          <h4>{t("enableMultihops")}</h4>
          <Switch
            onChange={() => setCanMultiHop((prev) => !prev)}
            checked={canMultiHop}
          />
        </div>
      </div>
    </Modal>
  );
};

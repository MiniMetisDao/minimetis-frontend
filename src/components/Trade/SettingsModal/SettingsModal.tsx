import React from "react";
import { useTranslation } from "react-i18next";

import { InputButton, InputCompact } from "components/Input";
import { Modal } from "components/Modal";
import { Switch } from "components/Switch";
import { TRADE_SETTINGS } from "config";
import { getSlippageTolerance, getSlippageToleranceString } from "utils";
import { useStorage } from "utils/storage";

import { deadlineInputStyles, styles } from "./styles";

type SettingsModalProps = {
  onClose: () => void;
};

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation("trade");

  const [canMultiHop, setCanMultiHop] = useStorage<boolean>(
    "enableMultiHops",
    true
  );

  const [slippageTolerance, setSlippageTolerance] = useStorage<number>(
    "slippageTolerance",
    TRADE_SETTINGS.slippage
  );

  const [transactionDeadline, setTransactionDeadline] = useStorage<number>(
    "transactionDeadline",
    TRADE_SETTINGS.deadline
  );

  //TODO: validations
  const handleSlippageChange = (value: string) => {
    setSlippageTolerance(getSlippageTolerance(value));
  };

  return (
    <Modal onClose={onClose} title={t("tradeSettings")}>
      <div css={styles}>
        <div className="settings-item">
          <h4>{t("slippageTolerance")}</h4>
          <div className="field-wrapper">
            <InputButton
              value="0.5"
              suffix="%"
              onChange={handleSlippageChange}
              active={
                (slippageTolerance as number) === getSlippageTolerance("0.5")
              }
            />
            <InputButton
              value="1.0"
              suffix="%"
              onChange={handleSlippageChange}
              active={
                (slippageTolerance as number) === getSlippageTolerance("1.0")
              }
            />
            <InputButton
              value="5.0"
              suffix="%"
              onChange={handleSlippageChange}
              active={
                (slippageTolerance as number) === getSlippageTolerance("5.0")
              }
            />
            <InputCompact
              value={getSlippageToleranceString(slippageTolerance as number)}
              onChange={handleSlippageChange}
              suffix="%"
            />
          </div>
        </div>
        <div className="settings-item">
          <h4>{t("transactionDeadline")}</h4>
          <div className="field-wrapper">
            <InputCompact
              wrapperCss={deadlineInputStyles}
              value={(transactionDeadline as number).toString()}
              onChange={(input) => setTransactionDeadline(parseInt(input))}
              suffix="mins"
            />
          </div>
        </div>
        <div className="settings-item">
          <h4>{t("enableMultihops")}</h4>
          <Switch
            onChange={(checked: boolean) => setCanMultiHop(checked)}
            checked={!!canMultiHop}
          />
        </div>
      </div>
    </Modal>
  );
};

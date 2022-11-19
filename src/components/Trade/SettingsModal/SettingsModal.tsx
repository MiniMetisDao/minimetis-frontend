import React from "react";
import { useTranslation } from "react-i18next";

import { InputButton, InputCompact } from "components/shared/Input";
import { Modal } from "components/shared/Modal";
import { Switch } from "components/shared/Switch";
import { TRADE_SETTINGS } from "config";
import { getSlippageTolerance, getSlippageToleranceInput } from "utils";
import { useStorage } from "utils/storage";

import { compactInputStyles, styles } from "./styles";

type SettingsModalProps = {
  onClose: () => void;
};

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation("trade");

  const [slippage, setSlippage] = React.useState<string>("");
  const [deadline, setDeadline] = React.useState<string>("");

  const { get, set } = useStorage();

  const canMultiHop = get("enableMultiHops", true);

  const storedSlippage = get(
    "slippageTolerance",
    TRADE_SETTINGS.slippage
  ) as number;

  const allowedSlippage = getSlippageTolerance(storedSlippage);

  const transactionDeadline = get<number>(
    "transactionDeadline",
    TRADE_SETTINGS.deadline
  );

  const handleSlippageChange = (value: string) => {
    setSlippage(value);
    set("slippageTolerance", value);
  };

  const handleDeadlineChange = (value: string) => {
    setDeadline(value);
    const deadlineInput = value === "" ? `${TRADE_SETTINGS.deadline}` : value;
    set("transactionDeadline", parseInt(deadlineInput, 10));
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
              active={allowedSlippage === 50}
            />
            <InputButton
              value="1.0"
              suffix="%"
              onChange={handleSlippageChange}
              active={allowedSlippage === 100}
            />
            <InputButton
              value="5.0"
              suffix="%"
              onChange={handleSlippageChange}
              active={allowedSlippage === 500}
            />
            <InputCompact
              wrapperCss={compactInputStyles}
              placeholder={getSlippageToleranceInput(allowedSlippage)}
              value={slippage}
              onChange={handleSlippageChange}
              suffix="%"
            />
          </div>
        </div>
        <div className="settings-item">
          <h4>{t("transactionDeadline")}</h4>
          <div className="field-wrapper">
            <InputCompact
              wrapperCss={compactInputStyles}
              placeholder={transactionDeadline?.toString()}
              value={deadline}
              onChange={handleDeadlineChange}
              suffix="mins"
            />
          </div>
        </div>
        <div className="settings-item">
          <h4>{t("enableMultihops")}</h4>
          <Switch
            onChange={(checked: boolean) =>
              set<boolean>("enableMultiHops", checked)
            }
            checked={!!canMultiHop}
          />
        </div>
      </div>
    </Modal>
  );
};

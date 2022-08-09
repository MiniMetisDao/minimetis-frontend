import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import { Input } from "components/Input";
import { Token } from "types/common";
import { getFormattedAmount, getFormattedAmountRounded } from "utils";

import { SelectTokenModal } from "../SelectTokenModal";

import { tokenInputStyles } from "./styles";

type TokenInputProps = {
  amount?: string;
  balance?: string;
  token?: Token;
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

  const handleChange = (input: string, message?: string) => {
    console.log("san", message);
    onChange(input);
  };

  const formattedBalance = getFormattedAmount(token, balance);

  const handleMaxClick = () => onChange(formattedBalance);
  const handleTokenSelectorClick = () => setShowTokenSelector(true);

  const handleTokenSelect = (token: Token) => {
    onTokenChange(token);
    setShowTokenSelector(false);
  };

  return (
    <>
      <div css={tokenInputStyles}>
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
                <img src={token.logoURI} /> {token.name}
              </>
            ) : (
              <span>{t("trade:selectToken")} </span>
            )}
            <span className="icon">
              <FaChevronDown />
            </span>
          </button>
        </div>
      </div>

      {showTokenSelector && (
        <SelectTokenModal
          selectedToken={token}
          onSelect={handleTokenSelect}
          onClose={() => setShowTokenSelector(false)}
        />
      )}
    </>
  );
};

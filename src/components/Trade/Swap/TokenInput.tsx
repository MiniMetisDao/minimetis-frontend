import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import { Token } from "../hooks/useTokens";

import { tokenInputStyles } from "./styles";

type TokenInputProps = {
  amount?: number;
  balance?: number;
  token?: Token;
  from?: boolean;
  onChange: (input?: number) => void;
};
export const TokenInput: React.FC<TokenInputProps> = ({
  amount = 0,
  balance = 0,
  token,
  from = false,
  onChange,
}) => {
  const { t } = useTranslation(["common", "trade"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    if (input === "") {
      onChange(undefined);
    } else {
      onChange(Number(input));
    }
  };

  return (
    <div css={tokenInputStyles}>
      <div className="input-title-wrapper">
        <span>{from ? t("trade:from") : t("trade:to")}</span>
        <span>
          {t("balance")} {balance ? balance : "0"}
        </span>
      </div>
      <div className="input-field-wrapper">
        <input
          name="input"
          value={amount > 0 ? amount : undefined}
          placeholder="0.00"
          onChange={handleChange}
        />
        {amount !== balance && (
          <button className="max-btn">{t("trade:max")}</button>
        )}
        <button className="token-selector-btn">
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
  );
};

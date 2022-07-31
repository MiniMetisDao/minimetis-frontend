import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import { Token } from "types/common";
import { getFormattedAmount, getFormattedAmountRounded } from "utils";

import { tokenInputStyles } from "./styles";

type TokenInputProps = {
  amount?: string;
  balance?: string;
  token?: Token;
  from?: boolean;
  estimated?: boolean;
  onChange: (input: string) => void;
};
export const TokenInput: React.FC<TokenInputProps> = ({
  amount = "",
  balance = "0",
  token,
  from = false,
  estimated = false,
  onChange,
}) => {
  const { t } = useTranslation(["common", "trade"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    onChange(input);
  };

  const formattedBalance = getFormattedAmount(token, balance);

  const handleMaxClick = () => onChange(formattedBalance);

  return (
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
        <input
          name="input"
          value={amount}
          placeholder="0.00"
          onChange={handleChange}
        />
        {formattedBalance !== amount && (
          <button className="max-btn" onClick={handleMaxClick}>
            {t("trade:max")}
          </button>
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

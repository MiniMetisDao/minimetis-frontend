import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { isValidNumberInput } from "utils";

import { styles } from "./styles";

export type InputProps = {
  onChange: (value: string, message?: string) => void;
  value: string;
  suffix?: string | ReactNode;
  wrapperCss?: any;
  [key: string]: any;
};

export const Input: React.FC<InputProps> = ({
  onChange,
  suffix,
  wrapperCss,
  ...props
}) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const isValidInput = isValidNumberInput(inputValue);
    setHasError(isValidInput ? false : true);
    onChange(inputValue, !isValidInput ? t("invalidInput") : "");
  };

  return (
    <div css={[styles({ hasError }), wrapperCss]}>
      <input {...props} onChange={handleChange} autoComplete="off" />
      {suffix && <span className="suffix">{suffix}</span>}
    </div>
  );
};

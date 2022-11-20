import React, { type ReactNode } from "react";

import { isValidNumberInput } from "utils/common";

import { styles } from "./styles";

export type InputProps = {
  onChange: (value: string) => void;
  value: string;
  suffix?: string | ReactNode;
  wrapperCss?: any;
  [key: string]: any;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  suffix,
  wrapperCss,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim().replace(/[, ]/g, ""); // remove commas
    const isValidInput = isValidNumberInput(inputValue);
    if (isValidInput) {
      onChange(inputValue);
    }
  };

  const hasError = isValidNumberInput(value) ? false : true;

  return (
    <div css={[styles({ hasError }), wrapperCss]}>
      <input
        {...props}
        onChange={handleChange}
        autoComplete="off"
        value={value}
      />
      {suffix && <span className="suffix">{suffix}</span>}
    </div>
  );
};

import React from "react";

import { type InputProps } from "./Input";
import { inputButtonStyles } from "./styles";

export const InputButton: React.FC<InputProps & { active?: boolean }> = ({
  value,
  active,
  suffix,
  onChange,
  ...props
}) => {
  const handleClick = () => {
    onChange(value);
  };

  return (
    <button
      {...props}
      css={inputButtonStyles({ active })}
      onClick={handleClick}
    >
      {value}
      {suffix}
    </button>
  );
};

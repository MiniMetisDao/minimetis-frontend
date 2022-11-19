import React from "react";

import { styles } from "./styles";

type ButtonProps = {
  [key: string]: any;
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button css={styles} {...props}>
      {children}
    </button>
  );
};

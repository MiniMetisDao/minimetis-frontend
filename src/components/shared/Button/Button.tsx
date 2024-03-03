import React from "react";

import { styles } from "./styles";

type ButtonProps = {
  [key: string]: any;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button css={styles} className={className} {...props}>
      {children}
    </button>
  );
};

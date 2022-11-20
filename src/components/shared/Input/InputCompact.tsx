import React from "react";

import { Input, type InputProps } from "./Input";
import { inputCompactStyles } from "./styles";

export const InputCompact: React.FC<InputProps> = ({
  wrapperCss,
  ...props
}) => <Input {...props} wrapperCss={[inputCompactStyles, wrapperCss]} />;

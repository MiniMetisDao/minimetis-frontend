import React from "react";

import { ThemeContext } from "./ThemeContext";
import type { Mode } from "./types";

export const useToggleTheme = (): [Mode, () => void] => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useToggleTheme must be used within a Theme component");
  }

  return [context.mode, context.toggleTheme];
};

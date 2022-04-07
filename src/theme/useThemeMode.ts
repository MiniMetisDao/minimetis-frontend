import React from "react";

import { ThemeContext } from "./ThemeContext";

export const useThemeMode = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a Theme component");
  }

  return context.mode;
};

import React from "react";

import { ThemeContext } from "./ThemeContext";

export const useToggleTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useToggleTheme must be used within a Theme component");
  }

  return context.toggleTheme;
};

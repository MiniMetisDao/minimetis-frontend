import React from "react";

import { type Mode } from "./types";

export type ThemeContext = {
  mode: Mode;
  toggleTheme: () => void;
};

export { type Mode };

export const ThemeContext = React.createContext<ThemeContext | null>(null);

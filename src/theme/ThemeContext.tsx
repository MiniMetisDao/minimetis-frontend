import React from "react";
import { Mode } from "./types";

export type ThemeContext = {
  mode: Mode;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContext | null>(null);

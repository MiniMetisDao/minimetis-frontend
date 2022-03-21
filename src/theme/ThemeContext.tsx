import React from "react";

export type Mode = "dark" | "light";

export type ThemeContext = {
  mode: Mode;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContext | null>(null);

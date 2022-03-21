import React from "react";
import { Global, ThemeProvider as ThemeProviderBase } from "@emotion/react";

import { globalStyles } from "./globalStyles";
import { darkTheme, lightTheme } from "./themes";
import { type Mode, ThemeContext } from "./ThemeContext";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>(
    (localStorage.getItem("mode") as Mode) || "dark"
  );

  const toggleTheme = () => {
    setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  React.useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProviderBase theme={theme}>
        <Global styles={globalStyles} />
        {children}
      </ThemeProviderBase>
    </ThemeContext.Provider>
  );
};

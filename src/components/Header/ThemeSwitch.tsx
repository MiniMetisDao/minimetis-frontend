import { Interpolation, Theme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useToggleTheme } from "theme";
import { themeSwitchStyle } from "./styles";

export const ThemeSwitch: React.FC<{
  css?: Interpolation<Theme>;
}> = (props) => {
  const { t } = useTranslation();
  const [theme, switchTheme] = useToggleTheme();

  return (
    <button css={themeSwitchStyle({ theme })} onClick={switchTheme}>
      <span>{theme === "light" ? t("darkMode") : t("lightMode")}</span>
    </button>
  );
};

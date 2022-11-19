import { useTranslation } from "react-i18next";

import { useTheme } from "theme";

import { themeSwitchStyle } from "./styles";

export const ThemeSwitch: React.FC = () => {
  const { t } = useTranslation();
  const [theme, switchTheme] = useTheme();

  return (
    <button css={themeSwitchStyle({ theme })} onClick={switchTheme}>
      <span>{theme === "light" ? t("darkMode") : t("lightMode")}</span>
    </button>
  );
};

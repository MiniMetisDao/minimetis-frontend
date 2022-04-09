import { Link } from "@tanstack/react-location";
import { ConnectWallet } from "components/ConnectWallet";
import { ThemeSwitch } from "./ThemeSwitch";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div css={styles}>
      <div className="left-wrapper">
        <div className="logo">
          <h1>
            <Link to="/">{t("siteName")}</Link>
          </h1>
        </div>
        <ul className="menu">
          <li>
            <Link to="/trade">{t("trade")}</Link>
          </li>
          <li>
            <Link to="/stake">{t("stake")}</Link>
          </li>
          <li>
            <Link to="/pool">{t("pool")}</Link>
          </li>
          <li>
            <Link to="/farm">{t("farm")}</Link>
          </li>
          <li>
            <Link to="/zap">{t("zap")}</Link>
          </li>
          <li>
            <Link to="/">{t("dashboard")}</Link>
          </li>
        </ul>
      </div>
      <div className="right-wrapper">
        <ThemeSwitch />
        <ConnectWallet />
      </div>
    </div>
  );
};

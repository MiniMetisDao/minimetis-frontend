import { Link } from "@tanstack/react-location";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface MenuProps {
  isMobile?: boolean;
  open?: boolean;
}
export const Menu: React.FC<MenuProps> = ({ isMobile, open }) => {
  const { t } = useTranslation();

  return (
    <ul
      className={classNames("menu", {
        "desktop-menu": !isMobile,
        "mobile-menu": isMobile,
        open,
      })}
    >
      <li>
        <Link to="/trade">{t("trade")}</Link>
      </li>
      <li>
        <Link to="/stake">{t("stake")}</Link>
      </li>
      <li>
        <Link to="/">{t("dashboard")}</Link>
      </li>
    </ul>
  );
};

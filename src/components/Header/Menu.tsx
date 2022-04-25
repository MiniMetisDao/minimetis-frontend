import { cx } from "@emotion/css";
import { Link } from "@tanstack/react-location";
import { useTranslation } from "react-i18next";

interface MenuProps {
  isMobile?: boolean;
  open?: boolean;
}
export const Menu: React.FC<MenuProps> = ({ isMobile, open }) => {
  const { t } = useTranslation();

  return (
    <ul
      className={cx("menu", {
        "desktop-menu": !isMobile,
        "mobile-menu": isMobile,
        open,
      })}
    >
      <li>
        <Link to="/about-us">{t("aboutUs")}</Link>
      </li>
      <li>
        <Link to="/hugs-not-rugs">{t("hugs")}</Link>
      </li>
      <li>
        <Link to="/">{t("dashboard")}</Link>
      </li>
    </ul>
  );
};

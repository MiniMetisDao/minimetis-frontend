import { cx } from "@emotion/css";
import { Link, MatchRoute } from "@tanstack/react-location";
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
        <Link to="/">{t("aboutUs")}</Link>
      </li>
      <li>
        <Link to="/hugs-not-rugs">{t("hugs")}</Link>
        {/* <ul>
          <li>
            <Link to="/about-hugs-not-rugs">About Hugs Not Rugs</Link>
          </li>
          <li>
            <Link to="/audit-portal">Audit Portal</Link>
          </li>
          <li>
            <Link to="/apply-now">Apply Now</Link>
          </li>
        </ul> */}
      </li>
      <li>
        <a href="https://nft.minimetis.com">{t("mint")}</a>
      </li>
      <li>
        <Link to="/trade">{t("trade")}</Link>
        <ul>
          <li>
            <Link to="/trade/swap-tokens">{t("swapTokens")}</Link>
          </li>
          <li>
            <Link to="/trade/liquidity-pool">{t("liquidityPool")}</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/dashboard">{t("dashboard")}</Link>
      </li>
    </ul>
  );
};

import { cx } from "@emotion/css";
import { Link } from "@tanstack/react-location";
import React from "react";
import { useTranslation } from "react-i18next";

import { ConnectWallet } from "components/ConnectWallet";

import { Menu } from "./Menu";
import { ThemeSwitch } from "./ThemeSwitch";
import { styles } from "./styles";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div css={styles}>
      <div className="header">
        <div className="left-wrapper">
          <div className="logo">
            <h1>
              <Link to="/">{t("siteName")}</Link>
            </h1>
          </div>
          <button
            className={menuOpen ? "hamburger-menu open" : "hamburger-menu"}
            onClick={handleMenuClick}
          >
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
          <Menu />
        </div>
        <div className="right-wrapper">
          <ThemeSwitch />
          <ConnectWallet />
        </div>
      </div>
      <div className={cx("mobile-menu-wrapper", { open: menuOpen })}>
        <Menu isMobile open={menuOpen} />

        <ThemeSwitch />
        <ConnectWallet />
      </div>
    </div>
  );
};

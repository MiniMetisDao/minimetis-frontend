import { Link, useMatch } from "@tanstack/react-location";
import React from "react";
import { useTranslation } from "react-i18next";

import { Container } from "components/Layout";
import { useTheme } from "theme";

import { LiquidityPool } from "./LiquidityPool";
import { Swap } from "./Swap";
import { styles } from "./styles";

export type TradeType = {
  title: string;
  TradeComponent: React.ReactNode;
  showbg: boolean;
};

export const Trade: React.FC = () => {
  const { pathname } = useMatch();
  const [theme] = useTheme();
  const { t } = useTranslation("trade");

  const { TradeComponent, title, showbg }: TradeType =
    pathname === "/trade/swap-tokens"
      ? { title: "miniSwap", TradeComponent: <Swap />, showbg: true }
      : {
          title: "liquidityPool",
          TradeComponent: <LiquidityPool />,
          showbg: false,
        };

  return (
    <div css={styles({ theme, showbg })}>
      <Container topSection>
        <div className="tabs">
          <Link to="/trade" className={showbg ? "selected-tab" : ""}>
            Mini Swap
          </Link>
          <Link
            to="/trade/liquidity-pool"
            className={showbg ? "" : "selected-tab"}
          >
            Liquidity
          </Link>
        </div>
        <h1>{t(title)}</h1>
        {TradeComponent}
      </Container>
    </div>
  );
};

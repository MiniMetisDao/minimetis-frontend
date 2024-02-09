import { Link, useMatch } from "@tanstack/react-location";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import coin_icon from "assets/images/coin.webp";
import transfer_icon from "assets/images/transfer.webp";
import { Container } from "components/Layout";
import { EXAMPLE_DATA } from "config/trade/constants";
import { useLiquidityStore } from "store/useLiquidityStore";
import { useTradeNavigation } from "store/useTradeNavigation";
import { useTheme } from "theme";

import { ImportPool } from "./ImportPool";
import { LiquidityPool } from "./LiquidityPool";
import PoolSection from "./PoolSection";
import { Swap } from "./Swap";
import { styles } from "./styles";

export type TradeType = {
  TradeComponent: React.ReactNode;
  showbg: boolean;
};

const SIZE = 30;
export const Trade: React.FC = () => {
  const { pathname } = useMatch();
  const { option, setOption } = useTradeNavigation();
  const { selectedPool } = useLiquidityStore();
  const [theme] = useTheme();
  const { t } = useTranslation("trade");

  const currentPool = useMemo(() => {
    if (!selectedPool) return EXAMPLE_DATA[0];

    return selectedPool;
  }, [selectedPool]);

  console.log(currentPool);

  const renderComponent = () => {
    if (option === "create") return <PoolSection lp={currentPool} />;
    if (option === "import") return <ImportPool />;

    return (
      <>
        <h1>{t("liquidityPool")}</h1>
        <LiquidityPool />
      </>
    );
  };

  const { TradeComponent, showbg }: TradeType =
    pathname === "/trade/swap-tokens"
      ? {
          TradeComponent: (
            <>
              <h1>{t("miniSwap")}</h1>
              <Swap />
            </>
          ),
          showbg: true,
        }
      : {
          TradeComponent: renderComponent(),
          showbg: false,
        };

  return (
    <div css={styles({ theme, showbg })}>
      <Container topSection>
        <div className="tabs">
          <Link to="/trade" className={showbg ? "selected-tab" : ""}>
            <img src={transfer_icon} width={SIZE} height={SIZE} />
            <span> Mini Swap</span>
          </Link>
          <Link
            to="/trade/liquidity-pool"
            onClick={() => setOption(null)}
            className={showbg ? "" : "selected-tab"}
          >
            <img src={coin_icon} width={SIZE} height={SIZE} />
            <span>Liquidity</span>
          </Link>
        </div>

        {TradeComponent}
      </Container>
    </div>
  );
};

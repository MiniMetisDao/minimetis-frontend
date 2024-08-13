import { useLocation } from "@tanstack/react-location";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "components/Layout";
import { useGetLiquidityPools } from "queries/trade";
import { useLiquidityStore } from "store/useLiquidityStore";
import { type SwapToken } from "types/common";

import HeaderPool from "./HeaderPool";
import { LiquidityPool } from "./LiquidityPool";
import PoolDetails from "./PoolDetails";
import SwapPool from "./SwapPool/SwapPool";
import { styles } from "./styles";

export type TradeType = {
  TradeComponent: React.ReactNode;
  showbg: boolean;
};

const extractAddressesFromUrl = (url: string): string[] | null => {
  const match = url.match(/\/pool\/add\/([^/]+)\/([^/]+)$/);

  if (match) {
    return [match[1], match[2]];
  }

  return null;
};

export const Pools: React.FC = () => {
  const { t } = useTranslation("trade");
  const { selectedPool, swapTokens, selectLP } = useLiquidityStore();
  const { data: liquidityPairs } = useGetLiquidityPools();
  const location = useLocation();

  useEffect(() => {
    const getData = () => {
      if (liquidityPairs.length === 0) return;
      if (swapTokens.length === 2) return;
      const urlPath = location.current.pathname;
      const addresses = extractAddressesFromUrl(urlPath);

      if (addresses) {
        // Find the liquidityPair that include the two addresses
        const pool = liquidityPairs.find((pair) => {
          return (
            pair.tokens[0].address === addresses[0] &&
            pair.tokens[1].address === addresses[1]
          );
        });
        if (pool) {
          if (pool.address === selectedPool?.address) return;
          const swapTokens: SwapToken[] = [
            {
              amount: "0",
              token: pool.tokens[0],
              estimated: true,
            },
            {
              amount: "0",
              token: pool.tokens[1],
              estimated: true,
            },
          ];

          selectLP(pool, swapTokens);
        }
      }
    };

    getData();
  }, [location, liquidityPairs, selectedPool, swapTokens, selectLP]);

  if (!liquidityPairs) return <div css={styles}>Loading List</div>;

  if (swapTokens.length === 2)
    return (
      <div css={styles}>
        <Container topSection>
          <HeaderPool />
          <div className="selected_wrapper">
            <PoolDetails lp={selectedPool} />
            <SwapPool
              lp={selectedPool}
              poolSwap={swapTokens}
              pairs={liquidityPairs}
            />
          </div>
        </Container>
      </div>
    );

  return (
    <div css={styles}>
      <Container topSection>
        <h1>{t("liquidityPool")}</h1>
        <LiquidityPool />
      </Container>
    </div>
  );
};

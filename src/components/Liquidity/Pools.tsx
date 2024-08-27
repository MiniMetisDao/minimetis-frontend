import { useLocation, useNavigate } from "@tanstack/react-location";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "components/Layout";
import {
  useGetLiquidityPoolBalances,
  useGetLiquidityPools,
} from "queries/trade";
import { useLiquidityStore } from "store/useLiquidityStore";
import { type SwapToken } from "types/common";
import { getSDKToken } from "utils/trade";

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

  const {
    selectedPool,
    swapTokens: swapTokensStore,
    selectLP,
  } = useLiquidityStore();

  const { data: liquidityPairs } = useGetLiquidityPools();
  const { data: liquidityBalances } = useGetLiquidityPoolBalances();
  const location = useLocation();
  const navigate = useNavigate();

  const swapTokens: SwapToken[] = useMemo(() => {
    if (swapTokensStore.length === 0) return swapTokensStore;

    return swapTokensStore.map((token) => ({
      token: getSDKToken(token.token),
      amount: token.amount,
      estimated: token.estimated,
    }));
  }, [swapTokensStore]);

  useEffect(() => {
    const getData = () => {
      if (liquidityPairs.length === 0) return;
      const urlPath = location.current.pathname;
      const addresses = extractAddressesFromUrl(urlPath);
      if (swapTokens.length === 2) {
        return;
      }

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
              amount: "",
              token: pool.tokens[0],
              estimated: false,
            },
            {
              amount: "",
              token: pool.tokens[1],
              estimated: false,
            },
          ];

          selectLP(pool, swapTokens);
        }
      }
    };

    getData();
  }, [location, liquidityPairs, selectedPool, swapTokens, selectLP, navigate]);

  if (!liquidityPairs) return <div css={styles}>Loading List</div>;

  if (swapTokens.length === 2)
    return (
      <div css={styles}>
        <Container topSection>
          <HeaderPool />
          <div className="selected_wrapper w-full">
            {swapTokens.length > 0 && (
              <PoolDetails lp={selectedPool} poolSwap={swapTokens} />
            )}
            <SwapPool
              lp={selectedPool}
              poolSwap={swapTokens}
              pairs={liquidityPairs}
              liquidityBalances={liquidityBalances}
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

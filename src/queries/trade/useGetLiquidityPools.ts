import { useQuery } from "@tanstack/react-query";
import { Pair, type Token as SDKToken } from "minime-sdk";

import { CHAIN_ID, factoryAbi } from "config";
import { BASES_TO_CHECK_TRADES_AGAINST } from "config/trade/constants";
import { LOGOS, tradingTokens } from "config/trade/tradingTokens";
import type { LiquidityType, Token } from "types/common";
import { useMultiCallContract } from "utils/multicall";
import { useStorage } from "utils/storage";
import { getSDKToken } from "utils/trade";

import { useGetRouterConstants } from "./useGetRouterConstants";

const createPairKey = (tokenA: SDKToken, tokenB: SDKToken) =>
  `${tokenA.address}-${tokenB.address}`;

// Function to get all liquidity pairs

const getAllLiquidityPairs = (tokens: Token[]) => {
  const seenPairs = new Set<string>();

  const liquidityPairs: Array<{
    name: string;
    tokens: [SDKToken, SDKToken];
    address: string;
    volume24h: string;
    totalFees: string;
    lpRewardApr: string;
  }> = [];

  const trade_list = BASES_TO_CHECK_TRADES_AGAINST[CHAIN_ID];

  for (const token of tokens) {
    const tokenSDK = getSDKToken(token);

    for (let index = 0; index < trade_list.length; index++) {
      const base = trade_list[index];
      if (base.address !== token.address) {
        const pair: [SDKToken, SDKToken] = [base, tokenSDK];

        const key1 = createPairKey(pair[0], pair[1]);
        const key2 = createPairKey(pair[1], pair[0]);

        if (!seenPairs.has(key1) && !seenPairs.has(key2)) {
          seenPairs.add(key1);

          liquidityPairs.push({
            name: `${pair[0].symbol}/${pair[1].symbol}`,
            tokens: pair,
            address: Pair.getAddress(pair[0], pair[1]),
            volume24h: "0",
            totalFees: "0",
            lpRewardApr: "0.1",
          });
        }
      }
    }
  }

  return liquidityPairs;
};

export const useGetLiquidityPools = () => {
  const { data: routerConstants } = useGetRouterConstants();
  const { get } = useStorage();
  const externalTokens = get("tradingTokens", []) as Token[];
  const allTokens = [...tradingTokens, ...externalTokens];

  const { data: liquidityPairs, isLoading: isLiquidityPairsLoading } = useQuery(
    ["trade", "allLiquidityPairs"],
    () => getAllLiquidityPairs(allTokens),
    {
      cacheTime: Infinity,
      staleTime: 24 * 60 * 60 * 1000,
      enabled: Boolean(routerConstants),
    }
  );

  const query =
    liquidityPairs?.map((pair) => ({
      method: "getPair",
      address: routerConstants?.factory,
      params: [pair.tokens[0].address, pair.tokens[1].address],
      abi: factoryAbi,
    })) || [];

  const {
    data: pairAddresses,
    isLoading: isPairAddressesLoading,
    ...rest
  } = useMultiCallContract<string[]>(["tradeQuery", "factoryPair"], query, {
    cacheTime: Infinity,
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: false,
    enabled: Boolean(query.length),
  });

  const data =
    pairAddresses && liquidityPairs
      ? liquidityPairs?.filter(
          (pair, idx) => pairAddresses[idx] === pair.address
        )
      : [];

  const dataTyped = data as LiquidityType[];

  return {
    data: dataTyped,
    isLoading: isLiquidityPairsLoading || isPairAddressesLoading,
    ...rest,
  };
};

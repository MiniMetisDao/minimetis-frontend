import { useMutation, useQuery } from "@tanstack/react-query";
import { Pair, Token as SDKToken } from "minime-sdk";

import { CHAIN_ID, factoryAbi } from "config";
import { BASES_TO_CHECK_TRADES_AGAINST } from "config/trade/constants";
import tradingTokens from "config/trade/tradingTokens.json";
import { useMultiCallContract } from "utils";
import { getSDKToken } from "utils/trade";

import { useGetRouterConstants } from "./useGetRouterConstants";

const getAllLiquidityPairs = () => {
  //TODO: dedupe duplicate pairs eg: [token1, token2] and [token2, token1]
  const liquidityPairWithCommonBases: [SDKToken, SDKToken][] =
    tradingTokens.flatMap((token) => {
      return BASES_TO_CHECK_TRADES_AGAINST[CHAIN_ID].map((base) =>
        base.address !== token.address ? [base, getSDKToken(token)] : undefined
      ).filter((pair) => pair) as [SDKToken, SDKToken][];
    });

  return liquidityPairWithCommonBases.map((pair) => ({
    name: `${pair[0].name}/${pair[1].name}`,
    tokens: pair,
    address: Pair.getAddress(pair[0], pair[1]),
  }));
};

const useLiquidityPairs = () => {
  const { data: routerConstants } = useGetRouterConstants();

  const { data: liquidityPairs } = useQuery(
    ["allLiquidityPairs"],
    getAllLiquidityPairs,
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

  const { data: pairAddresses } = useMultiCallContract<string[]>(
    ["factoryPair", query],
    query,
    {
      cacheTime: Infinity,
      staleTime: 24 * 60 * 60 * 1000,
      refetchInterval: false,
      enabled: Boolean(query.length),
    }
  );

  const validLiquidityPairs = pairAddresses
    ? liquidityPairs?.filter(
        (pair, idx) => pairAddresses[idx] === pair.address // if pair is not created getPair will give 0x000..
      )
    : [];

  if (pairAddresses) {
    //validLiquidityPairs;
  }

  return useMutation(() => {});
};

export const useGetLiquidityPools = () => {
  const { mutateAsync } = useLiquidityPairs();

  // using useQuery to cache data
  return useQuery(["getLiquidityPools"], () => mutateAsync);
};

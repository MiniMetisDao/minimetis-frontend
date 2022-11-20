import { type UseQueryResult } from "@tanstack/react-query";

import { ROUTER_CONTRACT_ADDRESS, routerAbi } from "config";
import { useMultiCallContract } from "utils";

const methods = ["factory"] as const;

type Methods = typeof methods[number];

type ResultSet = Record<Methods, any>;

const query = methods.map((method) => ({
  method,
  address: ROUTER_CONTRACT_ADDRESS,
  abi: routerAbi,
}));

const selector = (results: string[]): ResultSet => {
  const res: Partial<ResultSet> = {};

  results.forEach((result, idx) => {
    res[methods[idx]] = result;
  });

  return res as ResultSet;
};

export const useGetRouterConstants = (): UseQueryResult<ResultSet, any> => {
  return useMultiCallContract(["tradeQuery", "routerConstants"], query, {
    cacheTime: Infinity,
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: false,
    select: selector,
  });
};

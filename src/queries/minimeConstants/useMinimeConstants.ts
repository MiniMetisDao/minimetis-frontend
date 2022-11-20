import { type UseQueryResult } from "@tanstack/react-query";

import { MINIME_CONTRACT_ADDRESS } from "config";
import { useMultiCallContract } from "utils/multicall";

const methods = [
  "name",
  "symbol",
  "decimals",
  "rewardToken",
  "distributor",
  "pair",
  "totalSupply",
  "getCirculatingSupply",
  "treasuryFeeReceiver",
] as const;

type Methods = typeof methods[number];

type ResultSet = Record<Methods, any>;

const query = methods.map((method) => ({
  method,
  address: MINIME_CONTRACT_ADDRESS,
}));

const selector = (results: string[]): ResultSet => {
  const res: Partial<ResultSet> = {};

  results.forEach((result, idx) => {
    res[methods[idx]] = result;
  });

  return res as ResultSet;
};

export const useMinimeConstants = (): UseQueryResult<ResultSet, any> => {
  return useMultiCallContract(
    ["minimeConstantsQuery", "minimeConstants"],
    query,
    {
      staleTime: Infinity,
      refetchInterval: false,
      select: selector,
    }
  );
};

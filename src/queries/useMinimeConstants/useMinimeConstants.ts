import { MINIMETIS_CONTRACT_ADDRESS } from "config";
import { UseQueryResult } from "react-query";
import { useMultiCallContract } from "utils";

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
  address: MINIMETIS_CONTRACT_ADDRESS,
}));

const selector = (results: string[]): ResultSet => {
  const res: Partial<ResultSet> = {};

  results.forEach((result, idx) => {
    res[methods[idx]] = result;
  });

  return res as ResultSet;
};

export const useMinimeConstants = (): UseQueryResult<ResultSet, any> => {
  return useMultiCallContract("minimeConstants", query, {
    staleTime: Infinity,
    refetchInterval: false,
    select: selector,
  });
};

import { useQuery } from "react-query";

import { Batch, QueryInfo } from "utils";

import { multicall, multicallDistributor } from "./multicall";

// TODO: Remove the duplicates here in batchLoader, multicontract hooks.
const batchLoader = new Batch({
  batchSize: 20,
  multiCallFn: async (queryInfos) => multicall(queryInfos),
});

const batchLoaderDistributor = new Batch({
  batchSize: 20,
  multiCallFn: async (queryInfos) => multicallDistributor(queryInfos),
});

export type Options = {
  // prettier-ignore
  refetchInterval?: number | false | ((data: any, query: any) => number | false) | undefined;
  staleTime?: number;
  cacheTime?: number;
  select?: ((data: any) => any) | undefined;
  enabled?: boolean;
};

export const useMultiCallContract = (
  key: any,
  queryInfo: QueryInfo | QueryInfo[],
  options: Options = {}
) => {
  return useQuery([key, queryInfo], () => batchLoader.load(queryInfo), {
    refetchInterval: options.refetchInterval ?? 5_000,
    staleTime: options.staleTime,
    cacheTime: options.cacheTime,
    select: options.select,
    enabled: options.enabled,
  });
};

export const useMultiCallContractDistributor = (
  key: any,
  queryInfo: QueryInfo | QueryInfo[],
  options: Options = {}
) => {
  return useQuery(
    [key, queryInfo],
    () => batchLoaderDistributor.load(queryInfo),
    {
      refetchInterval: options.refetchInterval ?? 5_000,
      staleTime: options.staleTime,
      cacheTime: options.cacheTime,
      select: options.select,
      enabled: options.enabled,
    }
  );
};

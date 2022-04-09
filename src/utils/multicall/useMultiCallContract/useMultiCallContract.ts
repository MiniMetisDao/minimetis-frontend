import { useQuery } from "react-query";

import { Batch, QueryInfo } from "utils";
import { multicall } from "./multicall";

const batchLoader = new Batch({
  batchSize: 10,
  multiCallFn: async (queryInfos) => multicall(queryInfos),
});

export type Options = {
  // prettier-ignore
  refetchInterval?: number | false | ((data: any, query: any) => number | false) | undefined;
  staleTime?: number;
  cacheTime?: number;
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
  });
};

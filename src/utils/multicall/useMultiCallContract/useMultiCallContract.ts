import { useQuery } from "@tanstack/react-query";

import { DEFAULT_BATCH_SIZE, DEFAULT_REFETCH_INTERVAL } from "config";
import { Batch, QueryInfo } from "utils";

import { multicall } from "./multicall";

const batchLoader = new Batch({
  batchSize: DEFAULT_BATCH_SIZE,
  multiCallFn: async (queryInfos) => multicall(queryInfos),
});

export type Options = {
  // prettier-ignore
  refetchInterval?: number | false | ((data: any, query: any) => number | false) | undefined;
  staleTime?: number;
  cacheTime?: number;
  select?: ((data: any) => any) | undefined;
  enabled?: boolean;
  batchLoader?: Batch;
};

export const useMultiCallContract = (
  key: any,
  queryInfo: QueryInfo | QueryInfo[],
  options: Options = {}
) => {
  const batchLoaderInstance = options.batchLoader ?? batchLoader;

  const result = useQuery(
    [key, queryInfo],
    () => batchLoaderInstance.load(queryInfo),
    {
      refetchInterval: options.refetchInterval ?? DEFAULT_REFETCH_INTERVAL,
      ...options,
    }
  );

  return result;
};

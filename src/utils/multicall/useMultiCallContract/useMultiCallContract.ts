import { type QueryKey, useQuery } from "@tanstack/react-query";

import { DEFAULT_BATCH_SIZE, DEFAULT_REFETCH_INTERVAL } from "config";

import { Batch, type QueryInfo } from "../Batch";

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

/**
 *
 * @param key static keys, passed to reactQuery as queryKeys along with queryInfo variables
 * @param queryInfo parameters used for querying
 * @param options options to reactQuery
 * @returns return from reactQuery
 */
export const useMultiCallContract = <TData = unknown, TError = unknown>(
  key: QueryKey,
  queryInfo: QueryInfo | QueryInfo[],
  options: Options = {}
) => {
  const batchLoaderInstance = options.batchLoader ?? batchLoader;

  const result = useQuery<TData, TError>(
    [...key, queryInfo],
    () => batchLoaderInstance.load(queryInfo),
    {
      refetchInterval: options.refetchInterval ?? DEFAULT_REFETCH_INTERVAL,
      ...options,
    }
  );

  return result;
};

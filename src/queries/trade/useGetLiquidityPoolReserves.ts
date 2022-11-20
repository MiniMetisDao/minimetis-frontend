import { pairAbi } from "config";
import { useMultiCallContract } from "utils";

export const useGetLiquidityPoolReserves = (lpAddress: string) => {
  const methods = ["getReserves", "token0", "token1", "totalSupply"];

  const query = methods.map((method) => ({
    method,
    address: lpAddress,
    abi: pairAbi,
  }));

  return useMultiCallContract<Record<string, string>>(
    ["tradeQuery", "liquidityPoolReserves"],
    query,
    {
      select: (response: string[]) =>
        response.reduce<Record<string, string>>((acc, result, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          acc[methods[idx]] = result;

          return acc;
        }, {}),
    }
  );
};

import { useGetWalletDetails } from "queries/walletDetails";
import { useMultiCallContract } from "utils";

import { useGetLiquidityPools } from "./useGetLiquidityPools";

export const useGetLiquidityPoolBalances = () => {
  const { data: liquidityPools } = useGetLiquidityPools();
  const { data: walletDetails } = useGetWalletDetails();

  const query =
    liquidityPools?.map((pool) => ({
      method: "balanceOf",
      address: pool.address,
      params: walletDetails?.address ? [walletDetails.address] : [],
    })) || [];

  return useMultiCallContract<Record<string, string>>(
    ["liquidityPoolBalances", query],
    query,
    {
      enabled: Boolean(query.length) && Boolean(walletDetails?.address),
      select: (response: string[]) =>
        response.reduce<Record<string, string>>((acc, balance, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          acc[liquidityPools![idx].address] = balance;

          return acc;
        }, {}),
    }
  );
};

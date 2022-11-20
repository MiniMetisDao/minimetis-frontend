import { ROUTER_CONTRACT_ADDRESS } from "config";
import { useGetWalletDetails } from "queries";
import { useMultiCallContract } from "utils";

export const useGetTokenAllowance = (tokenAddress: string) => {
  const { data: walletDetails } = useGetWalletDetails();

  const tokenParams = {
    address: tokenAddress,
    method: "allowance",
    params: walletDetails?.address
      ? [walletDetails?.address, ROUTER_CONTRACT_ADDRESS]
      : [],
  };

  return useMultiCallContract<string>(
    ["tradeQuery", "tokenAllowance"],
    tokenParams,
    {
      enabled: Boolean(walletDetails?.address),
    }
  );
};

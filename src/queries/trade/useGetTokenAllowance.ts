import { ROUTER_CONTRACT_ADDRESS } from "config";
import { useGetWalletDetails } from "queries";
import { Token } from "types/common";
import { useMultiCallContract } from "utils";

export const useGetTokenAllowance = ({ token }: { token: Token }) => {
  const { data: walletDetails } = useGetWalletDetails();

  const tokenParams = {
    address: token.address,
    method: "allowance",
    params: walletDetails?.address
      ? [walletDetails?.address, ROUTER_CONTRACT_ADDRESS]
      : [],
  };

  return useMultiCallContract<string>(
    ["tokenAllowance", tokenParams],
    tokenParams,
    {
      enabled: Boolean(walletDetails?.address),
    }
  );
};

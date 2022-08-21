import { ROUTER_CONTRACT_ADDRESS } from "config";
import { useGetWalletDetails } from "queries";
import { Token } from "types/common";
import { useMultiCallContract } from "utils";

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: string;
};

export const useGetTokenAllowance = ({ token }: { token: Token }): Result => {
  const { data: walletDetails } = useGetWalletDetails();

  const tokenParams = {
    address: token.address,
    method: "allowance",
    params: walletDetails?.address
      ? [walletDetails?.address, ROUTER_CONTRACT_ADDRESS]
      : [],
  };

  return useMultiCallContract(["tokenAllowance", tokenParams], tokenParams, {
    enabled: Boolean(walletDetails?.address),
  });
};

import { useGetWalletDetails } from "queries/walletDetails";
import { connectWallet, switchNetwork } from "utils";

export const useWalletConnector = () => {
  const { data, refetch } = useGetWalletDetails();

  return async () => {
    if (data?.status === "CONNECTED") {
      return true;
    }
    if (data?.status === "INVALID_NETWORK") {
      await switchNetwork();
      await connectWallet();
    } else {
      await connectWallet();
    }

    const response = await refetch();

    return response.data?.status === "CONNECTED";
  };
};

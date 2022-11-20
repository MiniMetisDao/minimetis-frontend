import { useGetWalletDetails } from "queries/walletDetails";
import { useWalletStore } from "store/wallet";
import { connectWallet, switchNetwork } from "utils/ethers";

export const useWalletConnector = () => {
  const { data, refetch } = useGetWalletDetails();
  const setWalletLogin = useWalletStore((state) => state.login);

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
    setWalletLogin();
    const response = await refetch();

    return response.data?.status === "CONNECTED";
  };
};

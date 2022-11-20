import { useQuery } from "@tanstack/react-query";

import { useWalletStore } from "store/wallet";
import { getWalletAddress, isSupportedNetworkConnected } from "utils/ethers";

export type WalletStatus =
  | "NO_METAMASK"
  | "INVALID_NETWORK"
  | "WALLET_NOT_CONNECTED"
  | "CONNECTED";

export type WalletDetails = {
  address?: string;
  status: WalletStatus;
  shortAddress?: string;
};

const fetchWalletDetails = async (
  walletConnected: boolean
): Promise<WalletDetails> => {
  console.log("walletConnected", walletConnected);
  const status: WalletStatus = "NO_METAMASK";
  let address = "";

  if (!window.ethereum) {
    return {
      status,
    };
  }

  const isValidNetworkConnected = await isSupportedNetworkConnected();

  if (!isValidNetworkConnected) {
    return {
      status: "INVALID_NETWORK",
    };
  }

  [address] = await getWalletAddress();

  if (!address || !walletConnected) {
    return {
      status: "WALLET_NOT_CONNECTED",
    };
  }

  return {
    status: "CONNECTED",
    address,
    shortAddress:
      address.substring(0, 6) + "..." + address.substring(address.length - 4),
  };
};

export const useGetWalletDetails = () => {
  const walletConnected = useWalletStore((state) => state.connected);

  return useQuery(
    ["walletDetailsQuery", "walletDetails", { walletConnected }],
    () => fetchWalletDetails(walletConnected),
    {
      refetchOnWindowFocus: true,
      staleTime: Infinity,
    }
  );
};

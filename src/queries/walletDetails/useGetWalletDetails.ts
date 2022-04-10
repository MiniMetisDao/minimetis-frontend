import { useQuery } from "react-query";
import { getWalletAddress, isMetisConnected } from "utils";

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

const fetchWalletDetails = async (): Promise<WalletDetails> => {
  let status: WalletStatus = "NO_METAMASK";
  let address: string = "";

  if (!window.ethereum) {
    return {
      status,
    };
  }

  const isValidNetworkConnected = await isMetisConnected();

  if (!isValidNetworkConnected) {
    return {
      status: "INVALID_NETWORK",
    };
  }

  [address] = await getWalletAddress();

  if (!address) {
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

export const useGetWalletDetails = () =>
  useQuery("walletDetails", () => fetchWalletDetails(), {
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });

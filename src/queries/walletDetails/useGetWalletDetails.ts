import { useQuery } from "react-query";
import { getWalletAddress, isMetisConnected } from "utils";

export type WalletStatus =
  | "NO_METAMASK"
  | "INVALID_NETWORK"
  | "WALLET_NOT_CONNECTED"
  | "CONNECTED";

export type WalletDetails = {
  address: string;
  status: WalletStatus;
  label?: string;
};

const fetchWalletDetails = async (): Promise<WalletDetails> => {
  let status: WalletStatus = "NO_METAMASK";
  let address: string = "";

  if (!window.ethereum) {
    return {
      status,
      address,
    };
  }

  const isValidNetworkConnected = await isMetisConnected();

  if (!isValidNetworkConnected) {
    return {
      status: "INVALID_NETWORK",
      address,
    };
  }

  [address] = await getWalletAddress();

  if (!address) {
    return {
      status: "WALLET_NOT_CONNECTED",
      address,
    };
  }

  return {
    status: "CONNECTED",
    address,
    label:
      address.substring(0, 6) + "..." + address.substring(address.length - 4),
  };
};

export const useGetWalletDetails = () =>
  useQuery("walletDetails", () => fetchWalletDetails(), {
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });

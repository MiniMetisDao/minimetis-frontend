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
  label: string;
};

const fetchWalletDetails = async (): Promise<WalletDetails> => {
  let status: WalletStatus = "NO_METAMASK";
  let address: string = "";

  if (!window.ethereum) {
    return {
      status,
      address,
      label: "No Metamask",
    };
  }

  const isValidNetworkConnected = await isMetisConnected();

  if (!isValidNetworkConnected) {
    return {
      status: "INVALID_NETWORK",
      address,
      label: "Connect to MiniMetis",
    };
  }

  [address] = await getWalletAddress();

  if (!address) {
    return {
      status: "WALLET_NOT_CONNECTED",
      address,
      label: "Connect Wallet",
    };
  }

  return {
    status: "CONNECTED",
    address,
    label: address.slice(0, 8),
  };
};

export const useGetWalletDetails = () =>
  useQuery("walletDetails", () => fetchWalletDetails(), {
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });

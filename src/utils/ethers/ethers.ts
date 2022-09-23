import { CHAIN_ID } from "config";
import { ethers } from "ethers";

export const getNetwork = async () =>
  await new ethers.providers.Web3Provider(window.ethereum).getNetwork();

export const isSupportedNetworkConnected = async () =>
  (await getNetwork())?.chainId === CHAIN_ID;

export const isSupportedNetwork = (chainId: string) =>
  parseInt(chainId) === CHAIN_ID;

export const getWalletAddress = async () =>
  await new ethers.providers.Web3Provider(window.ethereum).send(
    "eth_accounts",
    []
  );

export const connectWallet = async () =>
  await new ethers.providers.Web3Provider(window.ethereum).send(
    "eth_requestAccounts",
    []
  );

//TODO: move to somewhere configurable to easily switch between multiple networks
export const switchNetwork = async () =>
  await new ethers.providers.Web3Provider(window.ethereum).send(
    "wallet_addEthereumChain",
    [
      {
        chainId: "0x440",
        rpcUrls: [`https://andromeda.metis.io/?owner=${CHAIN_ID}`],
        chainName: "Metis Andromeda Mainnet",
        nativeCurrency: {
          name: "METIS",
          symbol: "METIS",
          decimals: 18,
        },
        blockExplorerUrls: ["https://andromeda-explorer.metis.io"],
      },
    ]
  );

export const listen = async (
  eventName: ethers.providers.EventType,
  listener: ethers.providers.Listener
) => window.ethereum?.on(eventName, listener);

export const unlisten = async (
  eventName: ethers.providers.EventType,
  listener: ethers.providers.Listener
) => window.ethereum?.removeListener(eventName, listener);

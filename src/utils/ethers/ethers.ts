import { METIS_CHAIN_ID } from "config";
import { ethers } from "ethers";

export const getNetwork = async () =>
  await new ethers.providers.Web3Provider(window.ethereum).getNetwork();

export const isMetisConnected = async () =>
  (await getNetwork())?.chainId === METIS_CHAIN_ID;

export const isMetisNetwork = (chainId: string) =>
  parseInt(chainId) === METIS_CHAIN_ID;

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

export const listen = async (
  eventName: ethers.providers.EventType,
  listener: ethers.providers.Listener
) => window.ethereum?.on(eventName, listener);

export const unlisten = async (
  eventName: ethers.providers.EventType,
  listener: ethers.providers.Listener
) => window.ethereum?.removeListener(eventName, listener);

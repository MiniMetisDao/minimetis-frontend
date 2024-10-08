import { Token as TokenSDK } from "minime-sdk";

import { CHAIN_ID, pairAbi } from "config";
import { ethers } from "ethers";
import { multicall } from "utils/multicall";

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

export const getTokenDetail = async (
  address: string
): Promise<TokenSDK | null> => {
  const queryInfos = [
    {
      address: address,
      method: "symbol",
    },
    {
      address: address,
      method: "decimals",
    },
    {
      address: address,
      method: "name",
    },
  ];

  try {
    const [symbol, decimals, name] = await multicall(queryInfos);

    if (!symbol || !decimals || !name) return null;
    const token = {
      chainId: 1088,
      address,
      decimals,
      name,
      symbol,
    };

    const SDKToken = new TokenSDK(
      token.chainId,
      token.address,
      token.decimals,
      token.symbol,
      token.name
    );

    return SDKToken;
  } catch (error) {
    console.error("Error fetching token info:", error);

    return null;
  }
};

export const getPoolReserves = async (lpAddress?: string) => {
  if (!lpAddress) return "0";
  const queryInfos = [
    {
      address: lpAddress,
      method: "totalSupply",
      abi: pairAbi,
    },
  ];
  try {
    const [totalSupply] = await multicall(queryInfos);

    return totalSupply;
  } catch (error) {
    console.error("Error fetching pool reserves:", error);

    return "0";
  }
};

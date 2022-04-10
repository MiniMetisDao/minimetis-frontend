import { useMinimeConstants } from "queries";
import {
  METIS_CONTRACT_ADDRESS,
  METIS_USDT_LP_CONTRACT_ADDRESS,
  MINIMETIS_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "config";
import { useMultiCallContract } from "utils";

const metisUsdtPairQuery = [
  {
    address: METIS_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [METIS_USDT_LP_CONTRACT_ADDRESS],
  },
  {
    address: USDT_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [METIS_USDT_LP_CONTRACT_ADDRESS],
  },
];

const miniMetisMetisPairQuery = (metisMinimetisLpContractAddress: string) => [
  {
    address: METIS_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [metisMinimetisLpContractAddress],
  },
  {
    address: MINIMETIS_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [metisMinimetisLpContractAddress],
  },
];

type TokenPairs = {
  metisUsdtPair: {
    metisTokens: number;
    usdtTokens: number;
  };
  metisMinimetisPair: {
    metisTokens: number;
    miniMetisTokens: number;
  };
};

export const useGetTokenPairs = () => {
  const { data: minimeConstants } = useMinimeConstants();

  const tokenPairs = useMultiCallContract(
    "tokenPairs",
    [...metisUsdtPairQuery, ...miniMetisMetisPairQuery(minimeConstants?.pair)],
    {
      refetchInterval: 5_000,
      enabled: Boolean(minimeConstants?.pair),
    }
  );

  let data: TokenPairs | undefined;

  if (tokenPairs.data) {
    data = {
      metisUsdtPair: {
        metisTokens: tokenPairs.data[0],
        usdtTokens: tokenPairs.data[1],
      },
      metisMinimetisPair: {
        metisTokens: tokenPairs.data[2],
        miniMetisTokens: tokenPairs.data[3],
      },
    };
  }

  return { ...tokenPairs, data };
};

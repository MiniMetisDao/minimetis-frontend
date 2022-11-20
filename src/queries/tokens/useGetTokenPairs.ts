import {
  BASE_TOKEN_CONTRACT_ADDRESS,
  METIS_BASE_TOKEN_LP_CONTRACT_ADDRESS,
  METIS_CONTRACT_ADDRESS,
  MINIME_CONTRACT_ADDRESS,
} from "config";
import { useGetMinimeConstants } from "queries/minimeConstants";
import { type TokenAmount } from "types/common";
import { useMultiCallContract } from "utils/multicall";

type TokenPairs = {
  metisBaseTokenPair: {
    metisAmount: TokenAmount;
    baseTokenAmount: TokenAmount;
  };
  metisMinimePair: {
    metisAmount: TokenAmount;
    miniMeAmount: TokenAmount;
  };
};

const metisBaseTokenPairQuery = [
  {
    address: METIS_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [METIS_BASE_TOKEN_LP_CONTRACT_ADDRESS],
  },
  {
    address: BASE_TOKEN_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [METIS_BASE_TOKEN_LP_CONTRACT_ADDRESS],
  },
];

//assumption that the pair is metis-minime
const metisMinimePairQuery = (metisMinimeLpContractAddress: string) => [
  {
    address: METIS_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [metisMinimeLpContractAddress],
  },
  {
    address: MINIME_CONTRACT_ADDRESS,
    method: "balanceOf",
    params: [metisMinimeLpContractAddress],
  },
];

const tokenDecimalsQuery = [
  {
    address: METIS_CONTRACT_ADDRESS,
    method: "decimals",
  },
  {
    address: BASE_TOKEN_CONTRACT_ADDRESS,
    method: "decimals",
  },
  {
    address: MINIME_CONTRACT_ADDRESS,
    method: "decimals",
  },
];

const selector = (response: string[]): TokenPairs => ({
  metisBaseTokenPair: {
    metisAmount: {
      amount: response[0],
      decimals: response[4],
    },
    baseTokenAmount: {
      amount: response[1],
      decimals: response[5],
    },
  },
  metisMinimePair: {
    metisAmount: {
      amount: response[2],
      decimals: response[4],
    },
    miniMeAmount: {
      amount: response[3],
      decimals: response[6],
    },
  },
});

export const useGetTokenPairs = () => {
  const { data: minimeConstants } = useGetMinimeConstants();

  return useMultiCallContract<TokenPairs>(
    ["tokenQuery", "tokenPairs"],
    [
      ...metisBaseTokenPairQuery,
      ...metisMinimePairQuery(minimeConstants?.pair),
      ...tokenDecimalsQuery,
    ],
    {
      select: selector,
      enabled: Boolean(minimeConstants?.pair),
    }
  );
};

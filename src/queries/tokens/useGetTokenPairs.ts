import {
  BASE_TOKEN_CONTRACT_ADDRESS,
  METIS_BASE_TOKEN_LP_CONTRACT_ADDRESS,
  METIS_CONTRACT_ADDRESS,
  MINIME_CONTRACT_ADDRESS,
} from "config";
import { useMinimeConstants } from "queries";
import { TokenAmount } from "types/common";
import { useMultiCallContract } from "utils";

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

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: TokenPairs;
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

export const useGetTokenPairs = (): Result => {
  const { data: minimeConstants, isLoading, isError } = useMinimeConstants();

  const tokenPairs = useMultiCallContract(
    "tokenPairs",
    [
      ...metisBaseTokenPairQuery,
      ...metisMinimePairQuery(minimeConstants?.pair),
      ...tokenDecimalsQuery,
    ],
    {
      enabled: Boolean(minimeConstants?.pair),
    }
  );

  let data: TokenPairs | undefined;

  if (tokenPairs.data) {
    data = {
      metisBaseTokenPair: {
        metisAmount: {
          amount: tokenPairs.data[0],
          decimals: tokenPairs.data[4],
        },
        baseTokenAmount: {
          amount: tokenPairs.data[1],
          decimals: tokenPairs.data[5],
        },
      },
      metisMinimePair: {
        metisAmount: {
          amount: tokenPairs.data[2],
          decimals: tokenPairs.data[4],
        },
        miniMeAmount: {
          amount: tokenPairs.data[3],
          decimals: tokenPairs.data[6],
        },
      },
    };
  }

  //TODO: isLoading and isError need to consider the above multicall also, right?
  return { isLoading, isError, data };
};

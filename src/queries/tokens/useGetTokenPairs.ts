import {
  BASE_TOKEN_CONTRACT_ADDRESS,
  METIS_BASE_TOKEN_LP_CONTRACT_ADDRESS,
  METIS_CONTRACT_ADDRESS,
  MINIME_CONTRACT_ADDRESS,
  MINIME_METIS_LP,
} from "config";
import { BASE_TOKENS_PAIRS } from "config/trade/basePairs";
import { TOKENS } from "config/trade/tradingTokens";
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
  metisEthPair: {
    metisAmount: TokenAmount;
    ethAmount: TokenAmount;
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

const getPairQuery = (lpAddress: string, tokenA: string, tokenB: string) => [
  {
    address: tokenA,
    method: "balanceOf",
    params: [lpAddress],
  },
  {
    address: tokenB,
    method: "balanceOf",
    params: [lpAddress],
  },
];

const selector = (response: string[]): TokenPairs => ({
  metisBaseTokenPair: {
    metisAmount: {
      amount: response[0],
      decimals: TOKENS.METIS.decimals,
    },
    baseTokenAmount: {
      amount: response[1],
      decimals: TOKENS["m.USDC"].decimals,
    },
  },
  metisMinimePair: {
    metisAmount: {
      amount: response[2],
      decimals: TOKENS.METIS.decimals,
    },
    miniMeAmount: {
      amount: response[3],
      decimals: TOKENS.MINIME.decimals,
    },
  },
  metisEthPair: {
    metisAmount: {
      amount: response[4],
      decimals: TOKENS.METIS.decimals,
    },
    ethAmount: {
      amount: response[5],
      decimals: TOKENS.WETH.decimals,
    },
  },
});

export const useGetTokenPairs = () => {
  const { data: minimeConstants } = useGetMinimeConstants();

  const metisMinimePairQuery = getPairQuery(
    MINIME_METIS_LP,
    METIS_CONTRACT_ADDRESS,
    MINIME_CONTRACT_ADDRESS
  );

  const metisEthQuery = getPairQuery(
    BASE_TOKENS_PAIRS.WETH,
    METIS_CONTRACT_ADDRESS,
    TOKENS.WETH.address
  );

  return useMultiCallContract<TokenPairs>(
    ["tokenQuery", "tokenPairs"],
    [...metisBaseTokenPairQuery, ...metisMinimePairQuery, ...metisEthQuery],
    {
      select: selector,
      enabled: Boolean(minimeConstants?.pair),
    }
  );
};

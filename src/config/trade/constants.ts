import { ChainId, JSBI, Percent, Token, WETH } from "minime-sdk";
import type { LiquidityType } from "utils/types";

import { CHAIN_ID } from "config";
import baseTokens from "config/trade/baseTokens.json";

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export const ZERO_PERCENT = new Percent("0");

export const ONE_HUNDRED_PERCENT = new Percent("1");

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000);
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE);
export const ONE = JSBI.BigInt(1);

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
  JSBI.BigInt(50),
  JSBI.BigInt(10000)
);

//TODO: check if required
const WMETIS_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
};

//TODO: fix testnet tokens
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [
    ...baseTokens.map(
      (token) =>
        new Token(
          token.chainId,
          token.address,
          token.decimals,
          token.symbol,
          token.name
        )
    ),
  ],
  [ChainId.TESTNET]: [...WMETIS_ONLY[ChainId.TESTNET]],
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
} = {
  [ChainId.TESTNET]: {
    // [AMPL.address]: [DAI, WETH[ChainId.TESTNET]]
  },
};

// == variables we need to get it from the user input ==
// TODO: <shan> Make this dynamic extract from ethers
export const chainId: any = CHAIN_ID;

export const singleHopOnly = false;

export const MAX_HOPS = 3;

export const independentField = "INPUT";

export enum TabOptions {
  All = "ALL",
  MY = "MY POOLS",
  FAVORITES = "FAVORITES",
}

export enum SWAP_METHODS {
  EXACT_INPUT = "swapExactTokensForTokensSupportingFeeOnTransferTokens",
  EXACT_OUTPUT = "swapTokensForExactTokens",
}

export const EXAMPLE_DATA: LiquidityType[] = [
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "BTC/ETH",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "ETH/LTC",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "BTC/LTC",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "ETH/USDT",
    liquidity: 80000,
    volume24h: 48000,
    lpRewardApr: 0.12,
  },
  {
    name: "ETH/DAI",
    liquidity: 95000,
    volume24h: 51000,
    lpRewardApr: 0.09,
  },
  {
    name: "DAI/USDC",
    liquidity: 70000,
    volume24h: 40000,
    lpRewardApr: -0.03,
  },
  {
    name: "LINK/USDT",
    liquidity: 110000,
    volume24h: 58000,
    lpRewardApr: 0.18,
  },
  {
    name: "ADA/USDC",
    liquidity: 85000,
    volume24h: 49000,
    lpRewardApr: 0.07,
  },
  {
    name: "XRP/ETH",
    liquidity: 100000,
    volume24h: 52000,
    lpRewardApr: 0.14,
  },
  {
    name: "DOT/USDT",
    liquidity: 105000,
    volume24h: 56000,
    lpRewardApr: 0.16,
  },
  {
    name: "UNI/DAI",
    liquidity: 88000,
    volume24h: 47000,
    lpRewardApr: 0.05,
  },
  {
    name: "LTC/BTC",
    liquidity: 78000,
    volume24h: 42000,
    lpRewardApr: 0.08,
  },
  {
    name: "XLM/USDC",
    liquidity: 92000,
    volume24h: 50000,
    lpRewardApr: 0.11,
  },
  {
    name: "EOS/ETH",
    liquidity: 87000,
    volume24h: 47000,
    lpRewardApr: 0.13,
  },
  {
    name: "TRX/USDT",
    liquidity: 89000,
    volume24h: 48000,
    lpRewardApr: 0.07,
  },
  {
    name: "BNB/DAI",
    liquidity: 96000,
    volume24h: 52000,
    lpRewardApr: 0.09,
  },
  {
    name: "XTZ/USDC",
    liquidity: 82000,
    volume24h: 45000,
    lpRewardApr: 0.14,
  },
  {
    name: "XMR/ETH",
    liquidity: 110000,
    volume24h: 60000,
    lpRewardApr: 0.16,
  },
  {
    name: "ATOM/USDT",
    liquidity: 75000,
    volume24h: 41000,
    lpRewardApr: 0.06,
  },
  {
    name: "NEO/USDC",
    liquidity: 94000,
    volume24h: 51000,
    lpRewardApr: 0.12,
  },
  {
    name: "YFI/DAI",
    liquidity: 99000,
    volume24h: 54000,
    lpRewardApr: 0.17,
  },
  {
    name: "DOGE/USDT",
    liquidity: 86000,
    volume24h: 47000,
    lpRewardApr: 0.1,
  },
  {
    name: "SOL/ETH",
    liquidity: 100000,
    volume24h: 55000,
    lpRewardApr: 0.15,
  },
  {
    name: "KSM/USDC",
    liquidity: 92000,
    volume24h: 50000,
    lpRewardApr: 0.08,
  },
  {
    name: "MKR/DAI",
    liquidity: 85000,
    volume24h: 46000,
    lpRewardApr: 0.13,
  },
  {
    name: "AAVE/USDT",
    liquidity: 88000,
    volume24h: 48000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "USDC/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },

  {
    name: "WETH/METIS",
    liquidity: 100000,
    volume24h: 50000,
    lpRewardApr: 0.1,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: -0.05,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
  {
    name: "WETH/MINIME",
    liquidity: 75000,
    volume24h: 40000,
    lpRewardApr: 18,
  },
];

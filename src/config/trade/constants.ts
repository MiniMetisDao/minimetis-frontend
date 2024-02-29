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

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

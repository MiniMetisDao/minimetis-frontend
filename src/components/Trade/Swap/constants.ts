import { ChainId, JSBI, Percent, Token, WETH } from "@netswap/sdk";

import {
  MAINNET_BNB,
  MAINNET_BUSD,
  MAINNET_BYTE,
  MAINNET_ETH,
  MAINNET_RELAY,
  MAINNET_USDC,
  MAINNET_USDT,
  MAINNET_WBTC,
  METIS,
  NETT,
} from "components/Trade/tokens";

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export const ZERO_PERCENT = new Percent("0");

export const ONE_HUNDRED_PERCENT = new Percent("1");

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000);
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE);

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
  JSBI.BigInt(50),
  JSBI.BigInt(10000)
);

const WMETIS_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
};

export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WMETIS_ONLY,
  [ChainId.MAINNET]: [
    ...WMETIS_ONLY[ChainId.MAINNET],
    MAINNET_USDC,
    MAINNET_USDT,
    NETT,
    MAINNET_BNB,
    MAINNET_RELAY,
    MAINNET_WBTC,
    MAINNET_BUSD,
    MAINNET_ETH,
    MAINNET_BYTE,
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
export const chainId: any = "1088";

export const singleHopOnly = false;

export const MAX_HOPS = 3;

export const independentField = "INPUT";

export const typedValue = "11";

export const inputCurrency = METIS;

export const outputCurrency = NETT;

export enum SWAP_METHODS {
  EXACT_INPUT = "swapExactTokensForTokens",
  EXACT_OUTPUT = "swapTokensForExactTokens",
}

import { type Token as TokenSDK } from "minime-sdk";

export type Token = {
  chainId: number;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
};

export type TradeSettings = {
  slippageTolerence: number;
  transactionDeadline: number;
  multiHop: boolean;
};

export type TokenAmount = {
  amount: string;
  decimals: number | string;
};

export type LP = {
  name: string;
  tokens: [Token, Token];
  address: string;
};

export type LiquidityType = {
  name: string;
  tokens: [TokenSDK, TokenSDK];
  tokensLogos: [string, string];
  address: string;
  volume24h: string;
  totalFees: string;
  lpRewardApr: string;
  liquidity: string;
};

export type SwapToken = {
  amount: string;
  token: TokenSDK;
  estimated?: boolean;
};

import { type CurrencyAmount, type Token as TokenSDK } from "minime-sdk";

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
  address: string;
};

export type PoolDetails = {
  prices: Record<string, string>;
  balances: Record<string, string>;
  liquidity: string;
  lpReward: string;
  address: string;
  symbols: Record<string, string>;
};
export type SwapToken = {
  amount: string;
  token: TokenSDK;
  estimated?: boolean;
};

export type Balance = { [token: string]: string };

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export type ParsedAmounts = { [x: string]: CurrencyAmount };

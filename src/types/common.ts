export type Token = {
  chainId: number;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  listInQuickView?: boolean;
  balance?: number;
};

export type TradeSettings = {
  slippageTolerence: number;
  transactionDeadline: number;
  multiHop: boolean;
};

export type TokenAmount = {
  amount: string;
  decimals: number;
};

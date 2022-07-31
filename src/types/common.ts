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

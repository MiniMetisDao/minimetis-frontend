export type AmountType = "price" | "percentage" | "number";

export type LiquidityType = {
  name: string;
  tokens: [Token, Token];
  address: string;
  volume24h: string;
  totalFees: string;
  lpRewardApr: string;
  liquidity: string;
};

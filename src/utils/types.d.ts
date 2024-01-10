export type AmountType = "price" | "percentage" | "number";

export type LiquidityType = {
  name: string;
  liquidity: number;
  volume24h: number;
  lpRewardApr: number;
};

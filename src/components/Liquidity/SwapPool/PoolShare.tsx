import BigNumber from "bignumber.js";
import { JSBI, Percent } from "minime-sdk";
import { useMemo } from "react";

import { Field, type SwapToken } from "types/common";

import ShareAmount from "./ShareAmount";

interface PoolShareProps {
  token0: SwapToken;
  token1: SwapToken;
  prices: Record<string, string | undefined>;
  noLiquidity: boolean;
  poolTokenPercentage?: Percent;
}

export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));

export default function PoolShare({
  token0,
  token1,
  prices,
  noLiquidity,
  poolTokenPercentage,
}: PoolShareProps) {
  const {
    amount: amount0,
    token: { symbol: name0 },
  } = token0;

  const {
    amount: amount1,
    token: { symbol: name1 },
  } = token1;

  const inputPrice = prices[Field.INPUT];
  const outputPrice = prices[Field.OUTPUT];
  const label0 = `${name0} per ${name1}`;
  const label1 = `${name1} per ${name0}`;

  const amount0BN = new BigNumber(amount0);
  const amount1BN = new BigNumber(amount1);

  const amount1Real = outputPrice
    ? outputPrice
    : amount0BN.dividedBy(amount1BN).toString();

  const amount0Real = inputPrice
    ? inputPrice
    : amount1BN.dividedBy(amount0BN).toString();

  const sharePercentage = useMemo(() => {
    if (prices && noLiquidity) return "100";

    return poolTokenPercentage?.toFixed(2) ?? "0";
  }, [poolTokenPercentage, prices, noLiquidity]);

  return (
    <div className="pool-share">
      <h4>Initial prices and pool share</h4>
      <div style={{ width: "100%", height: "1px", background: "gray" }} />
      <div className="w-full flex justify-between items-center">
        <ShareAmount amount={amount0Real} label={label0} />
        <ShareAmount amount={amount1Real} label={label1} />
        <ShareAmount
          amount={sharePercentage}
          label="Share of Pool"
          type="percentage"
        />
      </div>
    </div>
  );
}

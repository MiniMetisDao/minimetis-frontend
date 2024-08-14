import BigNumber from "bignumber.js";

import { type SwapToken } from "types/common";

import ShareAmount from "./ShareAmount";

interface PoolShareProps {
  token0: SwapToken;
  token1: SwapToken;
}

export default function PoolShare({ token0, token1 }: PoolShareProps) {
  const {
    amount: amount0,
    token: { symbol: name0 },
  } = token0;

  const {
    amount: amount1,
    token: { symbol: name1 },
  } = token1;

  const label0 = `${name0} per ${name1}`;
  const label1 = `${name1} per ${name0}`;
  const percentageAmount = amount0.length && amount1.length ? "100" : "0";

  const amount0BN = new BigNumber(amount0);
  const amount1BN = new BigNumber(amount1);
  const amount1Real = amount0BN.dividedBy(amount1BN).toString();
  const amount0Real = amount1BN.dividedBy(amount0BN).toString();

  return (
    <div className="pool-share">
      <h4>Initial prices and pool share</h4>
      <div style={{ width: "100%", height: "1px", background: "gray" }} />
      <div className="w-full flex justify-between items-center">
        <ShareAmount amount={amount0Real} label={label0} />
        <ShareAmount amount={amount1Real} label={label1} />
        <ShareAmount
          amount={percentageAmount}
          label="Share of Pool"
          type="percentage"
        />
      </div>
    </div>
  );
}

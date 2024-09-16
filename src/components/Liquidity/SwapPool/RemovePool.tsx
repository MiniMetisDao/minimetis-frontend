import { JSBI, type Pair, Percent, type Token, TokenAmount } from "minime-sdk";
import { useMemo, useState } from "react";
import { BsArrowDown } from "react-icons/bs";

import { Button } from "components/shared/Button";

import PoolAmounts from "./PoolAmounts";
import SliderAmount from "./SliderAmount";

type Props = {
  tokenA: Token;
  tokenB: Token;
  lpBalance: string;
  prices: Record<string, string | undefined>;
  pair: Pair;
  totalSupply: string | undefined;
};

const EMPTY_BALANCE = {
  token0Deposited: undefined,
  token1Deposited: undefined,
};

export default function RemovePool({
  lpBalance,
  prices,
  tokenA,
  tokenB,
  pair,
  totalSupply,
}: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  const updateValue = (newValue: number) => {
    setValue(newValue);
  };

  const { token0Deposited, token1Deposited } = useMemo(() => {
    if (!pair) return EMPTY_BALANCE;
    if (!totalSupply || !lpBalance) return EMPTY_BALANCE;
    if (totalSupply === "0") return EMPTY_BALANCE;
    if (lpBalance === "0") return EMPTY_BALANCE;
    const totalPoolTokens = new TokenAmount(pair.liquidityToken, totalSupply);
    const userPoolBalance = new TokenAmount(pair.liquidityToken, lpBalance);

    const isGreaterThanOrEqual = JSBI.greaterThanOrEqual(
      totalPoolTokens.raw,
      userPoolBalance.raw
    );

    const [token0Deposited, token1Deposited] = isGreaterThanOrEqual
      ? [
          pair.getLiquidityValue(
            pair.token0,
            totalPoolTokens,
            userPoolBalance,
            false
          ),
          pair.getLiquidityValue(
            pair.token1,
            totalPoolTokens,
            userPoolBalance,
            false
          ),
        ]
      : [undefined, undefined];

    return { token0Deposited, token1Deposited };
  }, [lpBalance, pair, totalSupply]);

  return (
    <>
      <div className="warning-remove">
        Tip: Removing pool tokens converts your position back into underlying
        tokens at the current rate, proportional to your share of the pool.
        Accrued fees are included in the amounts you receive.
      </div>
      <SliderAmount
        value={value}
        onChange={handleChange}
        updateValue={updateValue}
      />
      <div className="arrow-center">
        <BsArrowDown size={24} />
      </div>
      <PoolAmounts tokenA={tokenA} tokenB={tokenB} />
      <Button>Remove</Button>
    </>
  );
}

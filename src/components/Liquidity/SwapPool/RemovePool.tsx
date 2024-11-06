import { Fraction, JSBI, type Pair, type Token, TokenAmount } from "minime-sdk";
import { useMemo, useState } from "react";
import { BsArrowDown } from "react-icons/bs";

import { Button } from "components/shared/Button";

import { RemoveLiquidityButton } from "../RemoveLiquidityButton";

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

  const { removeToken0, removeToken1, amountToRemove } = useMemo(() => {
    const bigIntValue = JSBI.BigInt(value);
    if (!token0Deposited || !token1Deposited) {
      const DEFAULT_0 = new TokenAmount(tokenA, JSBI.BigInt(0));
      const DEFAULT_1 = new TokenAmount(tokenB, JSBI.BigInt(0));

      const DEFAULT_AMOUNT = new TokenAmount(
        pair.liquidityToken,
        JSBI.BigInt(0)
      );

      return {
        removeToken0: DEFAULT_0,
        removeToken1: DEFAULT_1,
        amountToRemove: DEFAULT_AMOUNT,
      };
    }
    const removeToken0 = token0Deposited
      .multiply(bigIntValue)
      .divide(JSBI.BigInt("100"));

    const removeToken1 = token1Deposited
      .multiply(bigIntValue)
      .divide(JSBI.BigInt("100"));

    const lpBalanceAmount = new TokenAmount(pair.liquidityToken, lpBalance);

    const amountToRemove = lpBalanceAmount
      .multiply(bigIntValue)
      .divide(JSBI.BigInt("100"));

    return { removeToken0, removeToken1, amountToRemove };
  }, [
    token0Deposited,
    token1Deposited,
    value,
    tokenA,
    tokenB,
    pair,
    lpBalance,
  ]);

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

      <PoolAmounts
        tokenA={tokenA}
        tokenB={tokenB}
        amountA={removeToken0.toFixed(6)}
        amountB={removeToken1.toFixed(6)}
      />
      <div className="button-wrapper">
        <RemoveLiquidityButton
          pairAddress={pair.liquidityToken.address}
          amount={amountToRemove.toFixed(pair.liquidityToken.decimals) ?? ""}
          hasInputError={false}
        />
      </div>
    </>
  );
}

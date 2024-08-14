import { type Trade } from "minime-sdk";
import React from "react";

import { Button } from "components/shared/Button";
import { MINIME_CONTRACT_ADDRESS } from "config";
import { type LiquidityType, type SwapToken } from "types/common";

import { LiquidityButton } from "./LiquidityButton";

interface DynamicButtonProps {
  hasInputError: boolean;
  fromToken: SwapToken;
  toToken: SwapToken;
  userEnteredToken: SwapToken;
  estimatedToken: SwapToken;
  slippageAdjustedInputAmount?: string;
  slippageAdjustedOutputAmount?: string;
  trade?: Trade;
  onSuccess?: () => void;
  lp: LiquidityType | null;
}

export default function DynamicButton({
  estimatedToken,
  fromToken,
  hasInputError,
  toToken,
  userEnteredToken,
  onSuccess,
  slippageAdjustedInputAmount,
  slippageAdjustedOutputAmount,
  trade,
  lp,
}: DynamicButtonProps) {
  const includeMINIME = () => {
    const { token: tokenFrom } = fromToken;
    const { token: tokenTo } = toToken;
    // check if one of the from or to token is MINIME_CONTRACT_ADDRESS, if is true, we show a Button Diabled
    const isMINIMEFrom = tokenFrom.address === MINIME_CONTRACT_ADDRESS;
    const isMINIMETo = tokenTo.address === MINIME_CONTRACT_ADDRESS;
    if (isMINIMEFrom) return true;
    if (isMINIMETo) return true;

    return false;
  };

  if (includeMINIME() && !lp)
    return <Button disabled={true}>PAIR NOT ALLOWED</Button>;

  return (
    <LiquidityButton
      hasInputError={hasInputError}
      fromToken={fromToken}
      toToken={toToken}
      userEnteredToken={userEnteredToken}
      estimatedToken={estimatedToken}
      slippageAdjustedInputAmount={slippageAdjustedInputAmount}
      slippageAdjustedOutputAmount={slippageAdjustedOutputAmount}
      trade={trade}
      onSuccess={onSuccess}
    />
  );
}

import { type Trade } from "minime-sdk";
import React from "react";

import { Button } from "components/shared/Button";
import { MINIME_CONTRACT_ADDRESS } from "config";
import { type LiquidityType, type SwapToken } from "types/common";

import { CreateLPButton } from "./CreateLPButton";
import { LiquidityButton } from "./LiquidityButton";

interface DynamicButtonProps {
  liquidityPairs: LiquidityType[];
  hasInputError: boolean;
  fromToken: SwapToken;
  toToken: SwapToken;
  userEnteredToken: SwapToken;
  estimatedToken: SwapToken;
  slippageAdjustedInputAmount?: string;
  slippageAdjustedOutputAmount?: string;
  trade?: Trade;
  onSuccess?: () => void;
}

export default function DynamicButton({
  liquidityPairs,
  estimatedToken,
  fromToken,
  hasInputError,
  toToken,
  userEnteredToken,
  onSuccess,
  slippageAdjustedInputAmount,
  slippageAdjustedOutputAmount,
  trade,
}: DynamicButtonProps) {
  const existPair = (): boolean => {
    const findPair = liquidityPairs.find((pair) => {
      const token0 = pair.tokens[0].address === fromToken.token.address;
      const token1 = pair.tokens[1].address === toToken.token.address;
      const token2 = pair.tokens[0].address === toToken.token.address;
      const token3 = pair.tokens[1].address === fromToken.token.address;

      return (token0 && token1) || (token2 && token3);
    });

    return !!findPair;
  };

  const includeMINIME = () => {
    // check if one of the from or to token is MINIME_CONTRACT_ADDRESS, if is true, we show a Button Diabled
    const isMINIMEFrom = fromToken.token.address === MINIME_CONTRACT_ADDRESS;
    const isMINIMETo = toToken.token.address === MINIME_CONTRACT_ADDRESS;
    if (isMINIMEFrom) return true;
    if (isMINIMETo) return true;

    return false;
  };

  if (includeMINIME()) return <Button disabled={true}>PAIR NOT ALLOWED</Button>;

  if (existPair())
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

  return (
    <CreateLPButton
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

import { type Percent, type Token } from "minime-sdk";
import { FaPlus } from "react-icons/fa";

import { TokenInput } from "components/Trade/Swap/TokenInput";
import { type ParsedAmounts, type SwapToken } from "types/common";

import { LiquidityButton } from "./LiquidityButton";
import PoolShare from "./PoolShare";

interface AddPoolProps {
  fromInput: string;
  toInput: string;
  poolSwap: SwapToken[];
  tradingPairBalances: Record<string, string> | undefined;
  handleFromChange: (amount: string) => void;
  handleToChange: (amount: string) => void;
  handleFromTokenChange: (token: Token) => void;
  handleToTokenChange: (token: Token) => void;
  hasInputError: boolean;
  warningMessage: string;
  allowedSlippage: number;
  noLiquidity: boolean;
  parsedAmounts: ParsedAmounts;
  prices: Record<string, string | undefined>;
  poolTokenPercentage: Percent | undefined;
  tradingPairBalancesRefetch: () => void;
}

export default function AddPool({
  allowedSlippage,
  fromInput,
  handleFromChange,
  handleFromTokenChange,
  handleToChange,
  handleToTokenChange,
  hasInputError,
  noLiquidity,
  parsedAmounts,
  poolSwap,
  poolTokenPercentage,
  prices,
  toInput,
  tradingPairBalances,
  tradingPairBalancesRefetch,
  warningMessage,
}: AddPoolProps) {
  return (
    <>
      <TokenInput
        from
        amount={fromInput}
        balance={tradingPairBalances?.[poolSwap[0].token.address] || ""}
        token={poolSwap[0].token}
        estimated={poolSwap[0].estimated}
        onChange={handleFromChange}
        onTokenChange={handleFromTokenChange}
      />

      <div className="middle-plus-wrapper">
        <FaPlus size="20" />
      </div>

      <TokenInput
        amount={toInput}
        balance={tradingPairBalances?.[poolSwap[1].token.address] || ""}
        token={poolSwap[1].token}
        estimated={poolSwap[1].estimated}
        onChange={handleToChange}
        onTokenChange={handleToTokenChange}
      />

      <PoolShare
        token0={poolSwap[0]}
        token1={poolSwap[1]}
        prices={prices}
        noLiquidity={noLiquidity}
        poolTokenPercentage={poolTokenPercentage}
      />

      <LiquidityButton
        hasInputError={hasInputError || warningMessage !== ""}
        fromToken={poolSwap[0].token}
        toToken={poolSwap[1].token}
        fromInput={fromInput}
        toInput={toInput}
        slippage={allowedSlippage}
        noLiquidity={noLiquidity}
        parsedAmounts={parsedAmounts}
        onSuccess={() => tradingPairBalancesRefetch()}
      />
    </>
  );
}

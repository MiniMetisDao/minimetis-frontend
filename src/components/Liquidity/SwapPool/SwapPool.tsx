import {
  type MakeGenerics,
  useNavigate,
  useSearch,
} from "@tanstack/react-location";
import BigNumber from "bignumber.js";
import { type Token, TradeType } from "minime-sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCog, FaPlus } from "react-icons/fa";

import { SettingsModal } from "components/Trade/SettingsModal";
import { TokenInput } from "components/Trade/Swap/TokenInput";
import { useDerivedSwapInfo } from "components/Trade/Swap/hooks/useDerivedSwapInfo";
import {
  computeSlippageAdjustedAmounts,
  getSignificantTradeAmount,
} from "components/Trade/Swap/utils";
import { Field } from "components/Trade/Swap/utils/types";
import { IconButton } from "components/shared/IconButton";
import { TRADE_SETTINGS } from "config";
import { useDerivedPool } from "hooks/useDerivedPool";
import { useGetTokenBalances } from "queries/trade";
import { useLiquidityStore } from "store/useLiquidityStore";
import { useTheme } from "theme";
import { type LiquidityType, type SwapToken } from "types/common";
import {
  getFormattedAmount,
  getSlippageTolerance,
  getSlippageToleranceInput,
  isPairOnList,
  isValidNumber,
} from "utils/common";
import { useStorage } from "utils/storage";

import { LiquidityButton } from "./LiquidityButton";
import PoolShare from "./PoolShare";
import Title from "./Title";
import { styles } from "./styles";

interface SwapPoolProps {
  lp: LiquidityType | null;
  poolSwap: SwapToken[];
  pairs: LiquidityType[];
}

type LocationGenerics = MakeGenerics<{
  Search: {
    from?: string;
    to?: string;
    amount?: string;
    slippage?: string;
  };
}>;

const isEnoughBalance = (balance: string, amount: string) => {
  return BigNumber(balance).isGreaterThan(BigNumber(amount));
};

export default function SwapPool({ lp, pairs, poolSwap }: SwapPoolProps) {
  const { t } = useTranslation("trade");
  const [theme] = useTheme();
  const navigate = useNavigate();
  const search = useSearch<LocationGenerics>();
  const { selectLP, updateTokens } = useLiquidityStore();
  // STATES
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [showTradeSettings, setShowTradeSettings] = useState(false);
  const [slippageFromSearch, setSlippageFromSearch] = useState<string>();
  const { get, set } = useStorage();

  const storedSlippage = get(
    "slippageTolerance",
    TRADE_SETTINGS.slippage
  ) as number;

  const allowedSlippage = getSlippageTolerance(storedSlippage);

  useEffect(() => {
    if (slippageFromSearch === undefined && search?.slippage) {
      setSlippageFromSearch(search.slippage);
      set("slippageTolerance", search.slippage);
    }
  }, [search, set, slippageFromSearch]);

  const { userEnteredToken, estimatedToken } = poolSwap[0]?.estimated
    ? { userEnteredToken: poolSwap[1], estimatedToken: poolSwap[0] }
    : { userEnteredToken: poolSwap[0], estimatedToken: poolSwap[1] };

  const { trade } = useDerivedSwapInfo({
    independentField: poolSwap[0].estimated ? Field.OUTPUT : Field.INPUT,
    inputCurrency: poolSwap[0].token,
    outputCurrency: poolSwap[1].token,
    typedValue: BigNumber(userEnteredToken.amount).isNaN()
      ? ""
      : BigNumber(userEnteredToken.amount).toFixed(),
  });

  const swapTokensList = poolSwap.map((poolToken) => poolToken.token);

  const { data: tradingPairBalances, refetch: tradingPairBalancesRefetch } =
    useGetTokenBalances({
      tokens: swapTokensList,
      refetchInterval: true,
    });

  const typedValue = BigNumber(userEnteredToken.amount).isNaN()
    ? ""
    : BigNumber(userEnteredToken.amount).toFixed();

  const otherTypedValue = BigNumber(estimatedToken.amount).isNaN()
    ? ""
    : BigNumber(estimatedToken.amount).toFixed();

  const {
    parsedAmounts,
    dependentField,
    noLiquidity,
    prices,
    poolTokenPercentage,
  } = useDerivedPool({
    independentField: poolSwap[0].estimated ? Field.OUTPUT : Field.INPUT,
    inputCurrency: poolSwap[0].token,
    outputCurrency: poolSwap[1].token,
    typedValue,
    lp,
    balances: tradingPairBalances,
  });

  const independentField = poolSwap[0].estimated ? Field.OUTPUT : Field.INPUT;

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity
      ? otherTypedValue
      : parsedAmounts[dependentField]?.toSignificant(6),
  };

  const handleFromChange = (amount: string) => {
    const [token0, token1] = poolSwap;

    updateTokens([
      { ...token0, amount, estimated: false },
      { ...token1, estimated: true },
    ]);
  };

  const handleToChange = (amount: string) => {
    const [token0, token1] = poolSwap;
    updateTokens([
      { ...token0, estimated: true },
      { ...token1, amount, estimated: false },
    ]);
  };

  const handleFlipClick = () => {
    const [token0, token1] = poolSwap;
    updateTokens([token1, token0]);
  };

  const handleFromTokenChange = (token: Token) => {
    if (token.address === poolSwap[1].token.address) {
      handleFlipClick();
    } else {
      const [token0, token1] = poolSwap;
      const newPair = isPairOnList(pairs, token, token1.token);
      if (newPair) {
        navigate({
          to: `add/${newPair.tokens[0].address}/${newPair.tokens[1].address}`,
          replace: true,
        });
      }
      const swapTokens = [{ ...token0, token }, token1];

      selectLP(newPair, swapTokens);
    }
  };

  const handleToTokenChange = (token: Token) => {
    if (token.address === poolSwap[0].token.address) {
      handleFlipClick();
    } else {
      const [token0, token1] = poolSwap;
      const newPair = isPairOnList(pairs, token0.token, token);
      if (newPair) {
        navigate({
          to: `add/${newPair.tokens[0].address}/${newPair.tokens[1].address}`,
          replace: true,
        });
      }
      const swapTokens = [token0, { ...token1, token }];
      selectLP(newPair, swapTokens);
    }
  };

  const handleSettingsClick = () => setShowTradeSettings(true);
  const handleSettingsClose = () => setShowTradeSettings(false);

  const hasInputError = poolSwap.some(
    ({ amount }) => !isValidNumber(BigNumber(amount).toFixed())
  );

  useEffect(() => {
    if (!tradingPairBalances) return;
    const fromToken = poolSwap[0];
    const toToken = poolSwap[1];

    const fromTokenBalance = getFormattedAmount(
      fromToken.token,
      tradingPairBalances[fromToken.token.address]
    );

    const toTokenBalance = getFormattedAmount(
      toToken.token,
      tradingPairBalances[toToken.token.address]
    );

    if (
      isEnoughBalance(fromTokenBalance, fromToken.amount) &&
      isEnoughBalance(toTokenBalance, toToken.amount)
    ) {
      setWarningMessage("");
    } else {
      setWarningMessage(t("insufficientBalance"));
    }
  }, [tradingPairBalances, poolSwap, t]);

  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(
    trade,
    allowedSlippage
  );

  return (
    <div css={styles({ theme })}>
      <div className="swap-container">
        <div className="title-wrapper">
          <Title lp={lp} />
          <span>
            {t("slippage")}
            {": "}
            {getSlippageToleranceInput(allowedSlippage)}%
            <IconButton onClick={handleSettingsClick}>
              <FaCog />
            </IconButton>
          </span>
        </div>
        <TokenInput
          from
          amount={poolSwap[0].amount}
          balance={tradingPairBalances?.[poolSwap[0].token.address] || ""}
          token={poolSwap[0].token}
          estimated={poolSwap[0].estimated}
          onChange={handleFromChange}
          onTokenChange={handleFromTokenChange}
        />

        <div className="middle-plus-wrapper">
          <FaPlus
            size="20"
            onClick={handleFlipClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        <TokenInput
          amount={poolSwap[1].amount}
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

        <div className="swap-btn-wrapper">
          <LiquidityButton
            hasInputError={hasInputError || warningMessage !== ""}
            fromToken={poolSwap[0]}
            toToken={poolSwap[1]}
            userEnteredToken={userEnteredToken}
            estimatedToken={estimatedToken}
            slippageAdjustedInputAmount={slippageAdjustedAmounts[
              Field.INPUT
            ]?.toExact()}
            slippageAdjustedOutputAmount={slippageAdjustedAmounts[
              Field.OUTPUT
            ]?.toExact()}
            trade={trade}
            onSuccess={() => tradingPairBalancesRefetch()}
          />
        </div>
      </div>
      {showTradeSettings && <SettingsModal onClose={handleSettingsClose} />}
    </div>
  );
}

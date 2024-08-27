import {
  type MakeGenerics,
  useNavigate,
  useSearch,
} from "@tanstack/react-location";
import BigNumber from "bignumber.js";
import { type Token } from "minime-sdk";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCog, FaPlus } from "react-icons/fa";

import { SettingsModal } from "components/Trade/SettingsModal";
import { TokenInput } from "components/Trade/Swap/TokenInput";
import { Field } from "components/Trade/Swap/utils/types";
import { IconButton } from "components/shared/IconButton";
import { TRADE_SETTINGS } from "config";
import { useDerivedPool } from "hooks/useDerivedPool";
import { useGetTokenBalances } from "queries/trade";
import { useLiquidityStore } from "store/useLiquidityStore";
import { useWalletStore } from "store/wallet";
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
import YourPosition from "./YourPosition";
import { styles } from "./styles";

interface SwapPoolProps {
  lp: LiquidityType | null;
  poolSwap: SwapToken[];
  pairs: LiquidityType[];
  liquidityBalances: Record<string, string> | undefined;
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
  return BigNumber(balance).isGreaterThanOrEqualTo(BigNumber(amount));
};

export default function SwapPool({
  lp,
  pairs,
  poolSwap,
  liquidityBalances,
}: SwapPoolProps) {
  const { t } = useTranslation("trade");
  const [theme] = useTheme();
  const navigate = useNavigate();
  const search = useSearch<LocationGenerics>();
  const { selectLP, updateTokens } = useLiquidityStore();
  const { connected } = useWalletStore();
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

  const lpBalance = useMemo(() => {
    if (!lp) return "0";
    if (!liquidityBalances) return "0";
    const balanceAmount = liquidityBalances[lp.address];
    if (!liquidityBalances) return "0";

    return balanceAmount;
  }, [liquidityBalances, lp]);

  useEffect(() => {
    if (slippageFromSearch === undefined && search?.slippage) {
      setSlippageFromSearch(search.slippage);
      set("slippageTolerance", search.slippage);
    }
  }, [search, set, slippageFromSearch]);

  const { userEnteredToken } = poolSwap[0]?.estimated
    ? { userEnteredToken: poolSwap[1] }
    : { userEnteredToken: poolSwap[0] };

  const swapTokensList = poolSwap.map((poolToken) => poolToken.token);

  const { data: tradingPairBalances, refetch: tradingPairBalancesRefetch } =
    useGetTokenBalances({
      tokens: swapTokensList,
      refetchInterval: true,
    });

  const typedValue = BigNumber(userEnteredToken.amount).isNaN()
    ? ""
    : BigNumber(userEnteredToken.amount).toFixed();

  const {
    parsedAmounts,
    dependentField,
    noLiquidity,
    prices,
    poolTokenPercentage,
    totalSupply,
    pair,
  } = useDerivedPool({
    independentField: poolSwap[0].estimated ? Field.OUTPUT : Field.INPUT,
    inputCurrency: poolSwap[0].token,
    outputCurrency: poolSwap[1].token,
    typedValue,
    lp,
    inputs: [poolSwap[0].amount, poolSwap[1].amount],
  });

  const independentField = poolSwap[0].estimated ? Field.OUTPUT : Field.INPUT;

  const { fromInput, toInput } = useMemo(() => {
    const independientAmount =
      independentField === Field.INPUT
        ? poolSwap[0].amount
        : poolSwap[1].amount;

    const dependiendAmount =
      independentField === Field.INPUT
        ? poolSwap[1].amount
        : poolSwap[0].amount;

    const formattedAmounts = {
      [independentField]: independientAmount,
      [dependentField]: noLiquidity
        ? dependiendAmount
        : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
    };

    return {
      fromInput: formattedAmounts[Field.INPUT],
      toInput: formattedAmounts[Field.OUTPUT],
    };
  }, [dependentField, noLiquidity, parsedAmounts, poolSwap, independentField]);

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

  const hasInputError = useMemo(() => {
    if (fromInput === "" || toInput === "") return true;
    if (fromInput === "0" || toInput === "0") return true;
    if (!isValidNumber(fromInput) || !isValidNumber(toInput)) return true;

    return false;
  }, [fromInput, toInput]);

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

    const isFromBalanceEnough = isEnoughBalance(fromTokenBalance, fromInput);
    const isToBalanceEnough = isEnoughBalance(toTokenBalance, toInput);

    if (isFromBalanceEnough && isToBalanceEnough) {
      setWarningMessage("");
    } else {
      setWarningMessage(t("insufficientBalance"));
    }
  }, [tradingPairBalances, poolSwap, t, fromInput, toInput]);

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
        {connected && (
          <YourPosition
            tokenA={poolSwap[0].token}
            tokenB={poolSwap[1].token}
            lpBalance={lpBalance}
            totalSupply={totalSupply}
            pair={pair}
          />
        )}
      </div>
      {showTradeSettings && <SettingsModal onClose={handleSettingsClose} />}
    </div>
  );
}

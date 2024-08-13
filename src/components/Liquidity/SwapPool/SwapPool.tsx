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
import { IoIosWarning } from "react-icons/io";

import DynamicButton from "components/Trade/CreateLiquidity/DynamicButton";
import Title from "components/Trade/CreateLiquidity/Title";
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

export default function SwapPool({ lp, pairs, poolSwap }: SwapPoolProps) {
  const { t } = useTranslation("trade");
  const [theme] = useTheme();
  const navigate = useNavigate();
  const search = useSearch<LocationGenerics>();
  const { selectLP, updateTokens } = useLiquidityStore();
  // STATES
  const [flipAnimation, setFlipAnimation] = useState(false);
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

  const userEnteredToken = poolSwap[0]?.estimated ? poolSwap[1] : poolSwap[0];

  const estimatedToken = poolSwap[0]?.estimated ? poolSwap[0] : poolSwap[1];

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
      { ...token0, amount, estimated: true },
      { ...token1, estimated: false },
    ]);
  };

  const handleFlipClick = () => {
    const [token0, token1] = poolSwap;
    updateTokens([token1, token0]);
    setFlipAnimation(true);
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

    const fromTokenBalance = getFormattedAmount(
      fromToken.token,
      tradingPairBalances[fromToken.token.address]
    );

    if (
      BigNumber(fromToken.amount).isGreaterThan(BigNumber(fromTokenBalance))
    ) {
      setWarningMessage(t("insufficientBalance"));
    } else {
      setWarningMessage("");
    }
  }, [tradingPairBalances, poolSwap, t]);

  useEffect(() => {
    if (
      trade?.tradeType === TradeType.EXACT_INPUT &&
      poolSwap[1].amount !== getSignificantTradeAmount(trade?.outputAmount, 6)
    ) {
      updateTokens([
        poolSwap[0],
        {
          ...poolSwap[1],
          amount: getSignificantTradeAmount(trade?.outputAmount, 6),
        },
      ]);
    }
    if (
      trade?.tradeType === TradeType.EXACT_OUTPUT &&
      poolSwap[0].amount !== getSignificantTradeAmount(trade?.inputAmount, 6)
    ) {
      updateTokens([
        {
          ...poolSwap[0],
          amount: getSignificantTradeAmount(trade?.inputAmount, 6),
        },
        poolSwap[1],
      ]);
    }
    if (
      !trade &&
      (BigNumber(userEnteredToken.amount).isNaN() ||
        BigNumber(userEnteredToken.amount).isEqualTo(0)) &&
      estimatedToken.amount !== ""
    ) {
      const [token0, token1] = poolSwap;
      updateTokens([
        { ...token0, amount: token0?.estimated ? "" : token0.amount },
        { ...token1, amount: token1?.estimated ? "" : token1.amount },
      ]);
    }
  }, [estimatedToken, userEnteredToken, poolSwap, trade, updateTokens]);

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
        <p className="swap-warning">
          {warningMessage && (
            <>
              <span className="icon">
                <IoIosWarning />
              </span>
              {warningMessage}
            </>
          )}
        </p>
        <div className="swap-btn-wrapper">
          <DynamicButton
            liquidityPairs={pairs}
            hasInputError={hasInputError || !!warningMessage}
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

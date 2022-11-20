import { cx } from "@emotion/css";
import { type MakeGenerics, useSearch } from "@tanstack/react-location";
import BigNumber from "bignumber.js";
import { TradeType } from "minime-sdk";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import { IoIosRepeat, IoIosWarning } from "react-icons/io";

import { Container } from "components/Layout";
import { IconButton } from "components/shared/IconButton";
import { TRADE_SETTINGS } from "config";
import tradingTokens from "config/trade/tradingTokens.json";
import { useGetTokenBalances } from "queries/trade";
import { useTheme } from "theme";
import { type Token } from "types/common";
import {
  getFormattedAmount,
  getSlippageTolerance,
  getSlippageToleranceInput,
  isValidNumber,
  searchExactToken,
} from "utils/common";
import { useStorage } from "utils/storage";
import { getSDKToken } from "utils/trade";

import { SettingsModal } from "../SettingsModal";

import { SwapButton } from "./SwapButton";
import { TokenInput } from "./TokenInput";
import { TradeInfo } from "./TradeInfo";
import { Field, useDerivedSwapInfo } from "./hooks/useDerivedSwapInfo";
import { styles } from "./styles";
import { type SwapToken } from "./types";
import { computeSlippageAdjustedAmounts } from "./utils/computeSlippageAdjustedAmounts";
import { getSignificantTradeAmount } from "./utils/getSignificantTradeAmount";

const getValidSwapTokens = (token0Search?: string, token1Search?: string) => {
  const validToken0 = token0Search
    ? searchExactToken(tradingTokens, token0Search) ?? tradingTokens[0]
    : tradingTokens[0];

  const validToken1 = token1Search
    ? searchExactToken(tradingTokens, token1Search) ?? tradingTokens[1]
    : tradingTokens[1];

  return [
    { token: validToken0, amount: "" },
    {
      token:
        validToken0.symbol === validToken1.symbol
          ? tradingTokens[0].symbol === validToken1.symbol
            ? tradingTokens[1]
            : tradingTokens[0]
          : validToken1,
      amount: "",
    },
  ];
};

type LocationGenerics = MakeGenerics<{
  Search: {
    from?: string;
    to?: string;
    amount?: string;
    slippage?: string;
  };
}>;

export const Swap: React.FC = () => {
  const { t } = useTranslation("trade");
  const [theme] = useTheme();
  const search = useSearch<LocationGenerics>();

  const [flipAnimation, setFlipAnimation] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState<string>("");
  const [showTradeSettings, setShowTradeSettings] = React.useState(false);
  const [slippageFromSearch, setSlippageFromSearch] = React.useState<string>();

  const [swapTokens, setSwapTokens] = React.useState<SwapToken[]>(
    getValidSwapTokens(search?.from, search?.to)
  );

  const { get, set } = useStorage();

  const storedSlippage = get(
    "slippageTolerance",
    TRADE_SETTINGS.slippage
  ) as number;

  const allowedSlippage = getSlippageTolerance(storedSlippage);

  React.useEffect(() => {
    if (slippageFromSearch === undefined && search?.slippage) {
      setSlippageFromSearch(search.slippage);
      set("slippageTolerance", search.slippage);
    }
  }, [search, set, slippageFromSearch]);

  const userEnteredToken = swapTokens[0]?.estimated
    ? swapTokens[1]
    : swapTokens[0];

  const estimatedToken = swapTokens[0]?.estimated
    ? swapTokens[0]
    : swapTokens[1];

  const { trade } = useDerivedSwapInfo({
    independentField: swapTokens[0].estimated ? Field.OUTPUT : Field.INPUT,
    inputCurrency: getSDKToken(swapTokens[0].token),
    outputCurrency: getSDKToken(swapTokens[1].token),
    typedValue: BigNumber(userEnteredToken.amount).isNaN()
      ? ""
      : BigNumber(userEnteredToken.amount).toFixed(),
  });

  const swapTokensList = swapTokens.map((swapToken) => swapToken.token);

  const { data: tradingPairBalances, refetch: tradingPairBalancesRefetch } =
    useGetTokenBalances({
      tokens: swapTokensList,
      refetchInterval: true,
    });

  const handleFromChange = (amount: string) => {
    setSwapTokens(([token0, token1]) => [
      { ...token0, amount, estimated: false },
      { ...token1, estimated: true },
    ]);
  };

  const handleToChange = (amount: string) =>
    setSwapTokens(([token0, token1]) => [
      { ...token0, estimated: true },
      { ...token1, amount, estimated: false },
    ]);

  const handleFlipClick = () => {
    setSwapTokens(([token0, token1]) => [token1, token0]);
    setFlipAnimation(true);
  };

  const handleFromTokenChange = (token: Token) => {
    if (token.address === swapTokens[1].token.address) {
      handleFlipClick();
    } else {
      setSwapTokens(([token0, token1]) => [{ ...token0, token }, token1]);
    }
  };

  const handleToTokenChange = (token: Token) => {
    if (token.address === swapTokens[0].token.address) {
      handleFlipClick();
    } else {
      setSwapTokens(([token0, token1]) => [token0, { ...token1, token }]);
    }
  };

  const handleSettingsClick = () => setShowTradeSettings(true);
  const handleSettingsClose = () => setShowTradeSettings(false);

  const hasInputError = swapTokens.some(
    ({ amount }) => !isValidNumber(BigNumber(amount).toFixed())
  );

  React.useEffect(() => {
    if (!tradingPairBalances) return;
    const fromToken = swapTokens[0];

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
  }, [tradingPairBalances, swapTokens, t]);

  React.useEffect(() => {
    if (
      trade?.tradeType === TradeType.EXACT_INPUT &&
      swapTokens[1].amount !== getSignificantTradeAmount(trade?.outputAmount, 6)
    ) {
      setSwapTokens(([token0, token1]) => [
        token0,
        {
          ...token1,
          amount: getSignificantTradeAmount(trade?.outputAmount, 6),
        },
      ]);
    }
    if (
      trade?.tradeType === TradeType.EXACT_OUTPUT &&
      swapTokens[0].amount !== getSignificantTradeAmount(trade?.inputAmount, 6)
    ) {
      setSwapTokens(([token0, token1]) => [
        { ...token0, amount: getSignificantTradeAmount(trade?.inputAmount, 6) },
        token1,
      ]);
    }
    if (
      !trade &&
      (BigNumber(userEnteredToken.amount).isNaN() ||
        BigNumber(userEnteredToken.amount).isEqualTo(0)) &&
      estimatedToken.amount !== ""
    ) {
      setSwapTokens(([token0, token1]) => [
        { ...token0, amount: token0?.estimated ? "" : token0.amount },
        { ...token1, amount: token1?.estimated ? "" : token1.amount },
      ]);
    }
  }, [estimatedToken, userEnteredToken, swapTokens, trade]);

  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(
    trade,
    allowedSlippage
  );

  return (
    <div css={styles({ theme })}>
      <Container topSection>
        <h1>{t("miniSwap")}</h1>
        <div className="swap-container">
          <div className="title-wrapper">
            <h2>{t("swap")}</h2>
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
            amount={swapTokens[0].amount}
            balance={tradingPairBalances?.[swapTokens[0].token.address] || ""}
            token={swapTokens[0].token}
            estimated={swapTokens[0].estimated}
            onChange={handleFromChange}
            onTokenChange={handleFromTokenChange}
          />
          <button
            className={cx("switch-input-btn", { flip: flipAnimation })}
            onClick={handleFlipClick}
            onAnimationEnd={() => setFlipAnimation(false)}
          >
            <IoIosRepeat />
          </button>
          <TokenInput
            amount={swapTokens[1].amount}
            balance={tradingPairBalances?.[swapTokens[1].token.address] || ""}
            token={swapTokens[1].token}
            estimated={swapTokens[1].estimated}
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
            <SwapButton
              hasInputError={hasInputError || !!warningMessage}
              fromToken={swapTokens[0]}
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

          <TradeInfo
            trade={trade}
            swapTokens={swapTokens}
            slippageAdjustedAmounts={slippageAdjustedAmounts}
          />
        </div>
        {showTradeSettings && <SettingsModal onClose={handleSettingsClose} />}
      </Container>
    </div>
  );
};

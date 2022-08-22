import { cx } from "@emotion/css";
import { Token as SDKToken, TradeType } from "@netswap/sdk";
import { type MakeGenerics, useSearch } from "@tanstack/react-location";
import BigNumber from "bignumber.js";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import { IoIosRepeat, IoIosWarning } from "react-icons/io";

import { IconButton } from "components/IconButton";
import { Container } from "components/Layout/Container";
import { TRADE_SETTINGS } from "config";
import tradingTokens from "config/tradingTokens.json";
import { useGetTokenBalances } from "queries";
import { useTheme } from "theme";
import { Token, TradeSettings } from "types/common";
import { getFormattedAmount, isValidNumber, searchExactToken } from "utils";
import { useStorage } from "utils/storage";

import { SettingsModal } from "../SettingsModal";

import { SwapButton } from "./SwapButton";
import { TokenInput } from "./TokenInput";
import { ONE_BIPS } from "./constants";
import { Field, useDerivedSwapInfo } from "./hooks/useDerivedSwapInfo";
import { styles } from "./styles";
import { SwapToken } from "./types";
import { computeSlippageAdjustedAmounts } from "./utils/computeSlippageAdjustedAmounts";
import { computeTradePriceBreakdown } from "./utils/computeTradePriceBreakdown";

const getValidSwapTokens = (
  token0Search?: string,
  token1Search?: string,
  amount = ""
) => {
  // TODO: handle case when both search terms are same
  const validToken0 = token0Search
    ? searchExactToken(tradingTokens, token0Search) ?? tradingTokens[0]
    : tradingTokens[0];

  const validToken1 = token1Search
    ? searchExactToken(tradingTokens, token1Search) ?? tradingTokens[1]
    : tradingTokens[1];

  return [
    { token: validToken0, amount },
    { token: validToken1, amount: "" },
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
  const [warningMessage, setWarningMessage] = React.useState<string>();
  const [showTradeSettings, setShowTradeSettings] = React.useState(false);

  const [swapTokens, setSwapTokens] = React.useState<SwapToken[]>(
    getValidSwapTokens(search?.from, search?.to, search?.amount)
  );

  const { data: balances } = useGetTokenBalances({
    tokens: tradingTokens,
  });

  const [allowedSlippage] = useStorage(
    "slippageTolerance",
    TRADE_SETTINGS.slippage
  );

  const userEnteredToken = swapTokens[0]?.estimated
    ? swapTokens[1]
    : swapTokens[0];

  const estimatedToken = swapTokens[0]?.estimated
    ? swapTokens[0]
    : swapTokens[1];

  const { trade } = useDerivedSwapInfo({
    independentField: swapTokens[0].estimated ? Field.OUTPUT : Field.INPUT,
    inputCurrency: new SDKToken(
      swapTokens[0].token.chainId,
      swapTokens[0].token.address,
      swapTokens[0].token.decimals,
      swapTokens[0].token.symbol
    ),
    outputCurrency: new SDKToken(
      swapTokens[1].token.chainId,
      swapTokens[1].token.address,
      swapTokens[1].token.decimals,
      swapTokens[1].token.symbol
    ),
    typedValue: userEnteredToken.amount,
  });

  const swapTokensList = swapTokens.map((swapToken) => swapToken.token);

  const { data: tradingPairBalances } = useGetTokenBalances({
    tokens: swapTokensList,
  });

  const handleFromChange = (amount: string) => {
    setSwapTokens(([token0, token1]) => [
      { ...token0, amount, estimated: false },
      {
        ...token1,
        amount: BigNumber(amount).isEqualTo(0) ? "" : token1.amount,
        estimated: true,
      },
    ]);
  };

  const handleToChange = (amount: string) =>
    setSwapTokens(([token0, token1]) => [
      {
        ...token0,
        amount: BigNumber(amount).isEqualTo(0) ? "" : token0.amount,
        estimated: true,
      },
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

  const handleSettingsChange = (tradeSettings: TradeSettings) => {
    console.log("tradeSettings", tradeSettings);
  };

  const hasInputError = swapTokens.some(({ amount }) => !isValidNumber(amount));

  React.useEffect(() => {
    if (!balances) return;
    const fromToken = swapTokens[0];

    const fromTokenBalance = getFormattedAmount(
      fromToken.token,
      balances[fromToken.token.address]
    );

    if (
      BigNumber(fromToken.amount).isGreaterThan(BigNumber(fromTokenBalance))
    ) {
      setWarningMessage(t("insufficientBalance"));
    } else {
      setWarningMessage("");
    }
  }, [balances, swapTokens, t]);

  React.useEffect(() => {
    if (
      trade?.tradeType === TradeType.EXACT_INPUT &&
      swapTokens[1].amount !== trade?.outputAmount.toSignificant(6)
    ) {
      setSwapTokens(([token0, token1]) => [
        token0,
        { ...token1, amount: trade?.outputAmount.toSignificant(6) },
      ]);
    }
    if (
      trade?.tradeType === TradeType.EXACT_OUTPUT &&
      swapTokens[0].amount !== trade?.inputAmount.toSignificant(6)
    ) {
      setSwapTokens(([token0, token1]) => [
        { ...token0, amount: trade?.inputAmount.toSignificant(6) },
        token1,
      ]);
    }
    if (
      !trade &&
      BigNumber(userEnteredToken.amount).isGreaterThan(0) &&
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
    (allowedSlippage as number) * 100
  );

  const minRecievedOrMaxSold =
    trade &&
    `${
      trade?.tradeType === TradeType.EXACT_INPUT
        ? slippageAdjustedAmounts[Field.OUTPUT]?.toFixed()
        : slippageAdjustedAmounts[Field.INPUT]?.toFixed()
    } ${trade?.outputAmount.currency.symbol}`;

  const { priceImpactWithoutFee, realizedLPFee } =
    computeTradePriceBreakdown(trade);

  const priceImpact =
    priceImpactWithoutFee &&
    (priceImpactWithoutFee.lessThan(ONE_BIPS)
      ? "<0.01%"
      : `${priceImpactWithoutFee.toFixed(4)}%`);

  const lpFee =
    realizedLPFee &&
    `${realizedLPFee.toFixed()} ${trade?.inputAmount.currency.symbol}`;

  return (
    <div css={styles({ theme })}>
      <Container topSection>
        <h1>{t("miniSwap")}</h1>
        <div className="swap-container">
          <div className="title-wrapper">
            <h2>{t("swap")}</h2>
            <IconButton onClick={handleSettingsClick}>
              <FaCog />
            </IconButton>
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
              hasInputError={hasInputError}
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
            />
          </div>

          <div className="trade-info">
            <span>
              {t(
                trade?.tradeType === TradeType.EXACT_OUTPUT
                  ? "maximumSold"
                  : "minimumReceived"
              )}
            </span>
            <span>{minRecievedOrMaxSold}</span>
          </div>

          <div className="trade-info">
            <span>{t("priceImpact")}</span>
            <span>{priceImpact}</span>
          </div>

          <div className="trade-info">
            <span>{t("liquidityProviderFee")}</span>
            <span>{lpFee}</span>
          </div>

          <div className="trade-info">
            <span>{t("tradeRoute")}</span>
            <span>
              {trade?.route?.path?.map(({ symbol }) => symbol).join("→")}
            </span>
          </div>
        </div>

        {showTradeSettings && (
          <SettingsModal
            onClose={handleSettingsClose}
            onChange={handleSettingsChange}
          />
        )}
      </Container>
    </div>
  );
};

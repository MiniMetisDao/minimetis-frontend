import { cx } from "@emotion/css";
import { Pair, Token as SDKToken } from "@netswap/sdk";
import { type MakeGenerics, useSearch } from "@tanstack/react-location";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import { IoIosRepeat, IoIosWarning } from "react-icons/io";

import { Button } from "components/Button";
import { ConnectButton } from "components/Connect";
import { IconButton } from "components/IconButton";
import { Container } from "components/Layout/Container";
import * as Tokens from "components/Trade/tokens";
import tradingTokens from "config/tradingTokens.json";
import { useGetTokenBalances, useGetWalletDetails } from "queries";
import { useTheme } from "theme";
import { Token, TradeSettings } from "types/common";
import {
  getFormattedAmount,
  getTokenAmount,
  isValidNumber,
  searchExactToken,
} from "utils";

import { SettingsModal } from "../SettingsModal";

import { TokenInput } from "./TokenInput";
import { ONE_BIPS } from "./constants";
import { Field, useDerivedSwapInfo } from "./hooks/useDerivedSwapInfo";
import { styles } from "./styles";
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

type SwapToken = {
  amount: string;
  token: Token;
  estimated?: boolean;
};

// == user inputs ==
const allowedSlippage = 0.5 * 100;
const typedValue = "13.897";
const independentField = Field.INPUT;
const inputCurrency = Tokens.BYTE;
const outputCurrency = Tokens.NETT;

export const Swap: React.FC = () => {
  const { t } = useTranslation("trade");
  const [theme] = useTheme();
  const search = useSearch<LocationGenerics>();
  console.log("search", search);

  const [flipAnimation, setFlipAnimation] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState<string>();
  const [showTradeSettings, setShowTradeSettings] = React.useState(false);

  const [swapTokens, setSwapTokens] = React.useState<SwapToken[]>(
    getValidSwapTokens(search?.from, search?.to, search?.amount)
  );

  const { data: walletDetails } = useGetWalletDetails();

  // const tokens = useTokens();
  const { data: balances } = useGetTokenBalances({
    tokens: tradingTokens,
    refetchInterval: false,
  });

  const { trade, parsedAmount } = useDerivedSwapInfo({
    independentField,
    inputCurrency,
    outputCurrency,
    typedValue,
  });

  const swapTokensList = swapTokens.map((swapToken) => swapToken.token);

  const { data: tradingPairBalances, isLoading: isTradingPairBalancesLoading } =
    useGetTokenBalances({
      tokens: swapTokensList,
    });

  console.log("balances", balances);
  console.log(
    "tradingPairBalances",
    tradingPairBalances,
    isTradingPairBalancesLoading
  );

  const lpPair = React.useMemo(() => {
    const token0 = new SDKToken(
      swapTokens[0].token.chainId,
      swapTokens[0].token.address,
      swapTokens[0].token.decimals
    );

    const token1 = new SDKToken(
      swapTokens[1].token.chainId,
      swapTokens[1].token.address,
      swapTokens[1].token.decimals
    );

    return Pair.getAddress(token0 as SDKToken, token1 as SDKToken);
  }, [swapTokens]);

  console.log("lpPair", lpPair);

  const handleFromChange = (amount: string) =>
    setSwapTokens(([token0, token1]) => [
      { ...token0, amount, estimated: false },
      { ...token1, estimated: true },
    ]);

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

  const handleSettingsClick = () => {
    console.log("open Modal");
    setShowTradeSettings(true);
  };

  const handleSettingsClose = () => {
    console.log("open Modal");
    setShowTradeSettings(false);
  };

  const handleSettingsChange = (tradeSettings: TradeSettings) => {
    console.log("tradeSettings", tradeSettings);
  };

  const hasInputError = swapTokens.some(({ amount }) => !isValidNumber(amount));

  React.useEffect(() => {
    if (balances) {
      const input = swapTokens[0];

      if (
        input.amount >
        getFormattedAmount(input.token, balances[input.token.address])
      ) {
        setWarningMessage(t("insufficientBalance"));
      } else {
        setWarningMessage("");
      }
    }
  }, [balances, swapTokens, t]);

  // == Amount we will get ==
  const outputAmountToDisplay = trade
    ? trade?.outputAmount.toSignificant(6)
    : "-";

  // == minimum recieved ==
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(
    trade,
    allowedSlippage
  );

  const minimumRecieved = trade
    ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${
        trade?.outputAmount.currency.symbol
      }`
    : "-";

  // == price impact ==
  const { priceImpactWithoutFee, realizedLPFee } =
    computeTradePriceBreakdown(trade);

  const priceImpact = priceImpactWithoutFee
    ? priceImpactWithoutFee.lessThan(ONE_BIPS)
      ? "<0.01%"
      : `${priceImpactWithoutFee.toFixed(2)}%`
    : "-";

  // == Liquidity Provider Fee ==
  const lpFee = realizedLPFee
    ? `${realizedLPFee.toSignificant(4)} ${trade?.inputAmount.currency.symbol}`
    : "-";

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

          {walletDetails?.status === "CONNECTED" ? (
            <Button disabled={hasInputError} className="swap-btn">
              {t("swap")}
            </Button>
          ) : (
            <ConnectButton />
          )}

          <div>
            <div>
              In Value ({inputCurrency.name}) - {parsedAmount?.toExact()}
            </div>

            <div>
              Out Value ({outputCurrency.name}) - {outputAmountToDisplay}
            </div>

            <div>Minimum recieved - {minimumRecieved}</div>

            <div>Price Impact - {priceImpact}</div>

            <div>Liquidity Provider Fee - {lpFee}</div>

            <div>
              Path - {trade?.route.path.map(({ symbol }) => symbol).join("-")}
            </div>
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

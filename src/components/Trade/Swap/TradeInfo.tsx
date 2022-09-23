import { CurrencyAmount, Trade, TradeType } from "minime-sdk";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosLink } from "react-icons/io";

import { IconButton } from "components/IconButton";
import { Tooltip } from "components/Tooltip";

import { TradeLinkModal } from "../TradeLinkModal";

import { ONE_BIPS } from "./constants";
import { Field } from "./hooks/useDerivedSwapInfo";
import { SwapToken } from "./types";
import { computeTradePriceBreakdown, getSignificantTradeAmount } from "./utils";

type TradeInfoProps = {
  trade?: Trade;
  swapTokens: SwapToken[];
  slippageAdjustedAmounts: {
    INPUT?: CurrencyAmount | undefined;
    OUTPUT?: CurrencyAmount | undefined;
  };
};

export const TradeInfo: React.FC<TradeInfoProps> = ({
  trade,
  slippageAdjustedAmounts,
  swapTokens,
}) => {
  const { t } = useTranslation("trade");

  const [showTradeLink, setShowTradeLink] = React.useState(false);

  const handleTradeLinkClick = () => setShowTradeLink(true);
  const handleTradeLinkClose = () => setShowTradeLink(false);

  const minRecievedOrMaxSold =
    trade &&
    `${
      trade?.tradeType === TradeType.EXACT_INPUT
        ? getSignificantTradeAmount(slippageAdjustedAmounts[Field.OUTPUT])
        : getSignificantTradeAmount(slippageAdjustedAmounts[Field.INPUT])
    } ${
      trade?.tradeType === TradeType.EXACT_INPUT
        ? trade?.outputAmount.currency.symbol
        : trade?.inputAmount.currency.symbol
    }`;

  const { priceImpactWithoutFee, realizedLPFee } =
    computeTradePriceBreakdown(trade);

  const priceImpact =
    priceImpactWithoutFee &&
    (priceImpactWithoutFee.lessThan(ONE_BIPS)
      ? "<0.01%"
      : `${priceImpactWithoutFee.toFixed(4)}%`);

  const lpFee =
    realizedLPFee &&
    `${getSignificantTradeAmount(realizedLPFee)} ${
      trade?.inputAmount.currency.symbol
    }`;

  return (
    <>
      <div className="trade-info">
        <span>
          {t("getTradeLink")}
          <Tooltip
            id="getTradeLinkInfo"
            content={t("getTradeLinkInfo")}
            infoIcon
          />
        </span>

        <span>
          <IconButton onClick={handleTradeLinkClick}>
            <IoIosLink />
          </IconButton>
        </span>
      </div>
      <div className="trade-info">
        <span>
          {t(
            trade?.tradeType === TradeType.EXACT_OUTPUT
              ? "maximumSold"
              : "minimumReceived"
          )}
          {trade?.tradeType === TradeType.EXACT_OUTPUT ? (
            <Tooltip
              id="maximumSoldInfo"
              content={t("maximumSoldInfo")}
              infoIcon
            />
          ) : (
            <Tooltip
              id="minimumReceivedInfo"
              content={t("minimumReceivedInfo")}
              infoIcon
            />
          )}
        </span>
        <span>{minRecievedOrMaxSold}</span>
      </div>

      <div className="trade-info">
        <span>
          {t("priceImpact")}
          <Tooltip
            id="priceImpactInfo"
            content={t("priceImpactInfo")}
            infoIcon
          />
        </span>
        <span>{priceImpact}</span>
      </div>

      <div className="trade-info">
        <span>
          {t("liquidityProviderFee")}
          <Tooltip
            id="liquidityProviderFeeInfo"
            content={t("liquidityProviderFeeInfo")}
            infoIcon
          />
        </span>
        <span>{lpFee}</span>
      </div>

      <div className="trade-info">
        <span>
          {t("tradeRoute")}
          <Tooltip id="tradeRouteInfo" content={t("tradeRouteInfo")} infoIcon />
        </span>
        <span>{trade?.route?.path?.map(({ symbol }) => symbol).join("→")}</span>
      </div>
      {showTradeLink && (
        <TradeLinkModal
          fromToken={swapTokens[0].token}
          toToken={swapTokens[1].token}
          onClose={handleTradeLinkClose}
        />
      )}
    </>
  );
};

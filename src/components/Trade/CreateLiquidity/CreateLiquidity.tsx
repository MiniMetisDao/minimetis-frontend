import { type MakeGenerics, useSearch } from "@tanstack/react-location";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCog, FaPlus } from "react-icons/fa";

import { IconButton } from "components/shared/IconButton";
import { TRADE_SETTINGS } from "config";
import { ADDRESS_ZERO } from "config/trade/constants";
import { tradingTokens } from "config/trade/tradingTokens";
import { useGetLiquidityPools, useGetTokenBalances } from "queries/trade";
import { useTheme } from "theme";
import { type Token } from "types/common";
import {
  getSlippageTolerance,
  getSlippageToleranceInput,
  searchExactToken,
} from "utils/common";
import { useStorage } from "utils/storage";

import { SettingsModal } from "../SettingsModal";

import { SwapButton } from "./SwapButton";
import { TokenInput } from "./TokenInput";
import { styles } from "./styles";
import { type SwapToken } from "./types";

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

export const CreateLiquidity: React.FC = () => {
  const { t } = useTranslation("trade");
  const [theme] = useTheme();
  const search = useSearch<LocationGenerics>();
  const { data } = useGetLiquidityPools();
  const [isDisabled, setIsDisabled] = useState(true);
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

  React.useEffect(() => {
    const checkPair = () => {
      if (!data) return;
      const { allPairs } = data;

      const findPair = allPairs.find((pair) => {
        const [pairTokenA, pairTokenB] = pair.tokens;
        const [swapTokenA, swapTokenB] = swapTokens;

        const pairTokenALower = pairTokenA.address.toLowerCase();
        const pairTokenBLower = pairTokenB.address.toLowerCase();
        const swapTokenALower = swapTokenA.token.address.toLowerCase();
        const swapTokenBLower = swapTokenB.token.address.toLowerCase();

        const isPairIdentical =
          (pairTokenALower === swapTokenALower &&
            pairTokenBLower === swapTokenBLower) ||
          (pairTokenALower === swapTokenBLower &&
            pairTokenBLower === swapTokenALower);

        return isPairIdentical;
      });
      if (findPair) {
        const exist = findPair.address === ADDRESS_ZERO;

        setIsDisabled(!exist);
      } else {
        setIsDisabled(false);
      }
    };

    checkPair();
  }, [swapTokens, data]);

  console.log({ isDisabled });

  return (
    <div css={styles({ theme })}>
      <div className="swap-container">
        <div className="title-wrapper">
          <h2>Create Pair</h2>
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

        <div className="middle-plus-wrapper">
          <FaPlus size="20" />
        </div>

        <TokenInput
          amount={swapTokens[1].amount}
          balance={tradingPairBalances?.[swapTokens[1].token.address] || ""}
          token={swapTokens[1].token}
          estimated={swapTokens[1].estimated}
          onChange={handleToChange}
          onTokenChange={handleToTokenChange}
        />
        <div className="swap-btn-wrapper">
          <SwapButton
            hasInputError={isDisabled}
            pairTokens={swapTokens}
            onSuccess={() => tradingPairBalancesRefetch()}
          />
        </div>
      </div>
      {showTradeSettings && <SettingsModal onClose={handleSettingsClose} />}
    </div>
  );
};

import { type MakeGenerics, useSearch } from "@tanstack/react-location";
import React from "react";
import { FaArrowLeft, FaCog } from "react-icons/fa";

import suggestion_icon from "assets/images/advise.png";
import { Button } from "components/shared/Button";
import { IconButton } from "components/shared/IconButton";
import { tradingTokens } from "config/trade/tradingTokens";
import { useGetTokenBalances } from "queries/trade";
import { useTradeNavigation } from "store/useTradeNavigation";
import { useTheme } from "theme";
import { type Token } from "types/common";
import { searchExactToken } from "utils/common";

import { SettingsModal } from "../SettingsModal";

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

export const ImportPool: React.FC = () => {
  const [theme] = useTheme();
  const { setOption } = useTradeNavigation();
  const search = useSearch<LocationGenerics>();

  const [showTradeSettings, setShowTradeSettings] = React.useState(false);

  const [swapTokens, setSwapTokens] = React.useState<SwapToken[]>(
    getValidSwapTokens(search?.from, search?.to)
  );

  const swapTokensList = swapTokens.map((swapToken) => swapToken.token);

  const { data: tradingPairBalances } = useGetTokenBalances({
    tokens: swapTokensList,
    refetchInterval: true,
  });

  const handleFromChange = (amount: string) => {
    setSwapTokens(([token0, token1]) => [
      { ...token0, amount, estimated: false },
      { ...token1, estimated: true },
    ]);
  };

  const handleFromTokenChange = (token: Token) => {
    setSwapTokens(([token0, token1]) => [{ ...token0, token }, token1]);
  };

  const handleSettingsClick = () => setShowTradeSettings(true);
  const handleSettingsClose = () => setShowTradeSettings(false);

  return (
    <div css={styles({ theme })}>
      <div className="swap-container">
        <div className="title-wrapper">
          <IconButton onClick={() => setOption(null)}>
            <FaArrowLeft />
          </IconButton>
          <h2>Import Pool</h2>

          <IconButton onClick={handleSettingsClick}>
            <FaCog />
          </IconButton>
        </div>
        <div className="suggestion">
          <img src={suggestion_icon} alt="suggestion" />
          <p>
            Use this tool to find pairs that don’t automatically appear in the
            interface
          </p>
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
        <h2>+</h2>
        <Button>Select a Token</Button>
        <div className="information">
          Select a token to find your liquidity.
        </div>
      </div>
      {showTradeSettings && <SettingsModal onClose={handleSettingsClose} />}
    </div>
  );
};

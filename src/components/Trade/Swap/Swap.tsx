import { Pair, Token as SDKToken } from "@netswap/sdk";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import { IoIosRepeat, IoIosWarning } from "react-icons/io";

import { Container } from "components/Layout/Container";
import { useTokens } from "components/Trade/hooks/useTokens";
import tradingTokens from "config/tradingTokens.json";
import { useGetTokenBalances } from "queries";
import { Token } from "types/common";

import { TokenInput } from "./TokenInput";
import { styles } from "./styles";

type SwapToken = {
  amount: string;
  token: Token;
  estimated?: boolean;
};

export const Swap: React.FC = () => {
  const { t } = useTranslation("trade");

  const [swapTokens, setSwapTokens] = React.useState<SwapToken[]>([
    { amount: "", token: tradingTokens[0] },
    { amount: "", token: tradingTokens[1] },
  ]);

  const [warningMessage, setWarningMessage] = React.useState<string>();

  // const tokens = useTokens();
  const { data: balances } = useGetTokenBalances({
    tokens: tradingTokens,
    refetchInterval: false,
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

  const handleFlipClick = () =>
    setSwapTokens(([token0, token1]) => [token1, token0]);

  return (
    <div css={styles}>
      <Container>
        <h1>{t("miniSwap")}</h1>
        <div className="swap-container">
          <div className="title-wrapper">
            <h2>{t("swap")}</h2> <FaCog />
          </div>
          <TokenInput
            from
            amount={swapTokens[0].amount}
            balance={tradingPairBalances?.[swapTokens[0].token.address] || ""}
            token={swapTokens[0].token}
            estimated={swapTokens[0].estimated}
            onChange={handleFromChange}
          />
          <button className="switch-input-btn" onClick={handleFlipClick}>
            <IoIosRepeat />
          </button>
          <TokenInput
            amount={swapTokens[1].amount}
            balance={tradingPairBalances?.[swapTokens[1].token.address] || ""}
            token={swapTokens[1].token}
            estimated={swapTokens[1].estimated}
            onChange={handleToChange}
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

          <button disabled className="swap-btn">
            {t("swap")}
          </button>
        </div>
      </Container>
    </div>
  );
};

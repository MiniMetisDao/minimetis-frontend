import { Pair, Token as SDKToken } from "@netswap/sdk";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import { IoIosRepeat, IoIosWarning } from "react-icons/io";

import { Container } from "components/Layout/Container";
import { SelectTokenModal } from "components/Trade/SelectTokenModal";
import { type Token, useTokens } from "components/Trade/hooks/useTokens";
import { CHAIN_ID } from "config";

import { TokenInput } from "./TokenInput";
import { styles } from "./styles";

type SwapToken = {
  amount: number;
  token: Token;
  estimated?: boolean;
};

export const Swap: React.FC = () => {
  const { t } = useTranslation("trade");
  const [input, setInput] = React.useState<number>();
  const [output, setOutput] = React.useState<number>();
  const [inputBalance, setInputBalance] = React.useState<number>();
  const [outputBalance, setOutputBalance] = React.useState<number>();
  const [warningMessage, setWarningMessage] = React.useState<string>();

  const tokens = useTokens();

  const getLpPair = () => {
    const token1AsTokenInstance = new SDKToken(
      CHAIN_ID,
      "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
      18
    );

    const token2AsTokenInstance = new SDKToken(
      CHAIN_ID,
      "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
      18
    );

    const pairAdd = Pair.getAddress(
      token1AsTokenInstance as SDKToken,
      token2AsTokenInstance as SDKToken
    );

    console.log("pairAdd", pairAdd);
  };

  getLpPair();

  React.useEffect(() => {
    if (input) {
      setWarningMessage(undefined);
      setInputBalance(input * 2);
      setOutputBalance(input * 4);
    } else {
      setWarningMessage(t("noInput"));
      setInputBalance(undefined);
      setOutputBalance(undefined);
    }
  }, [input, t]);

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
            amount={input}
            balance={inputBalance}
            token={tokens[0]}
            onChange={setInput}
          />
          <button className="switch-input-btn">
            <IoIosRepeat />
          </button>
          <TokenInput
            amount={output}
            balance={outputBalance}
            token={tokens[1]}
            onChange={setOutput}
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

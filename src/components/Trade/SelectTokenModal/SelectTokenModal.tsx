import React from "react";
import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";
import { Modal } from "components/Modal";
import tradingTokens from "config/trade/tradingTokens.json";
import { useGetTokenBalances } from "queries";
import { Token } from "types/common";
import { searchToken } from "utils";

import { listStyle, styles } from "./styles";

type SelectTokenModalProps = {
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
};

export const SelectTokenModal: React.FC<SelectTokenModalProps> = ({
  selectedToken,
  onSelect,
  onClose,
}) => {
  const { t } = useTranslation("trade");
  const [search, setSearch] = React.useState("");

  const { data: tradingTokensBalances } = useGetTokenBalances({
    tokens: tradingTokens,
    refetchInterval: true,
  });

  const tokensList = React.useMemo(() => {
    if (!search) {
      return tradingTokens;
    }

    return searchToken(tradingTokens, search);
  }, [search]);

  return (
    <Modal onClose={onClose} title={t("trade:selectToken")}>
      <div css={styles}>
        <input
          placeholder={t("selectNamePlaceholder")}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <div className="token-list">
          {tokensList.map((token) => (
            <div
              key={token.address}
              css={listStyle({
                isSelected: token.address === selectedToken?.address,
              })}
              onClick={() =>
                token.address !== selectedToken?.address && onSelect(token)
              }
            >
              <img className="token-logo" src={token.logoURI} />

              <div className="details">
                <div>{token.name}</div>
                <div className="token-symbol">{token.symbol}</div>
              </div>

              {tradingTokensBalances?.[token.address] && (
                <DisplayPrice
                  amount={tradingTokensBalances[token.address]}
                  decimals={token.decimals}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";
import { Modal } from "components/Modal";
import tradingTokens from "config/tradingTokens.json";
import { useGetTokenBalances } from "queries";
import { Token } from "types/common";

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
  });

  const tokensList = React.useMemo(() => {
    if (!search) {
      return tradingTokens;
    }

    return tradingTokens.filter((token) =>
      Boolean(
        token.address.indexOf(search) === 0 ||
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase())
      )
    );
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
              onClick={() => onSelect(token)}
            >
              <img className="token-logo" src={token.logoURI} />

              <div className="details">
                <div>{token.name}</div>
                <div className="token-symbol">{token.symbol}</div>
              </div>

              {tradingTokensBalances?.[token.address] && (
                <DisplayPrice
                  price={tradingTokensBalances[token.address]}
                  decimals={Math.pow(10, token.decimals)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

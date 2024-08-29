import { type Token } from "minime-sdk";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsBookmarkXFill } from "react-icons/bs";

import { DisplayPrice } from "components/shared/DisplayPrice";
import { Modal } from "components/shared/Modal";
import { LOGOS } from "config/trade/tradingTokens";
import { useGetTokenBalances } from "queries/trade";
import { isExternal } from "utils/common";

import useTokenSearch from "../../../hooks/useTokenSearch";

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
  const { tokenList, newTokenAdded, removeToken } = useTokenSearch(search);

  const { data: tradingTokensBalances } = useGetTokenBalances({
    tokens: tokenList,
    refetchInterval: true,
  });

  return (
    <Modal onClose={onClose} title={t("trade:selectToken")}>
      <div css={styles}>
        <input
          placeholder={t("selectNamePlaceholder")}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        {newTokenAdded && <div>New token added!</div>}
        <div className="token-list">
          {tokenList.map((token) => (
            <div
              key={token.address}
              css={listStyle({
                isSelected: token.address === selectedToken?.address,
              })}
              onClick={() =>
                token.address !== selectedToken?.address && onSelect(token)
              }
            >
              <div className="wrapper-detail">
                <img className="token-logo" src={LOGOS[token.address]} />
                <div className="details">
                  <div>{token.name}</div>
                  <div className="token-symbol">{token.symbol}</div>
                </div>
                {isExternal(token.symbol) && (
                  <BsBookmarkXFill
                    onClick={(e) => {
                      e.stopPropagation();
                      removeToken(token);
                    }}
                    size="15px"
                  />
                )}
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

import * as React from "react";
import { useTranslation } from "react-i18next";

import { DisplayPrice } from "components/DisplayPrice";

import { Token } from "../hooks/useTokens";

import { listStyle, styles } from "./styles";

type SelectTokenModalProps = {
  tokens: Token[];
  onSelect: (token: Token) => void;
  selectedToken: Token;
};

export const SelectTokenModal: React.FC<SelectTokenModalProps> = ({
  onSelect,
  selectedToken,
  tokens = [],
}) => {
  const { t } = useTranslation("trade");
  const [search, setSearch] = React.useState("");

  const tokensList = React.useMemo(() => {
    if (!search) {
      return tokens;
    }

    return tokens.filter((token) =>
      Boolean(
        token.address.indexOf(search) === 0 ||
          token.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tokens]);

  return (
    <div css={styles}>
      <div>{t("selectToken")}</div>

      <input
        className="selectName"
        placeholder={t("selectNamePlaceHolder")}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <div>
        {tokensList.map((token) => (
          <div
            key={token.address}
            css={listStyle({
              isSelected: token.address !== selectedToken?.address,
            })}
            onClick={() => onSelect(token)}
          >
            <img className="logo" src={token.logoURI} />

            <div className="details">
              <div>{token.name}</div>
              <div>{token.symbol}</div>
            </div>

            {token.balance && (
              <DisplayPrice
                price={token.balance}
                decimals={Math.pow(10, token.decimals)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

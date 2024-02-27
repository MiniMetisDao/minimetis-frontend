import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";

import { tradingTokens } from "config/trade/tradingTokens";
import type { Token } from "types/common";
import { searchToken } from "utils/common";
import { getTokenDetail } from "utils/ethers";
import { useStorage } from "utils/storage";

const useTokenSearch = (search: string) => {
  const { get, set } = useStorage();
  const externalTokens = get("tradingTokens", []) as Token[];
  const allTokens = [...tradingTokens, ...externalTokens];
  const [tokenList, setTokenList] = useState<Token[]>(allTokens);
  const [newTokenAdded, setNewTokenAdded] = useState(false);

  const removeToken = (token: Token) => {
    const updatedTokenList = tokenList.filter(
      (t) => t.address !== token.address
    );

    setTokenList(updatedTokenList);

    const updatedExternalTokens = externalTokens.filter(
      (t) => t.address !== token.address
    );

    set("tradingTokens", updatedExternalTokens);
  };

  useEffect(() => {
    const getTokens = async () => {
      const searchTrim = search.trim();

      if (searchTrim.length === 0) {
        console.log(allTokens);
        setTokenList(allTokens);
        setNewTokenAdded(false);
      }

      if (searchTrim.length) {
        const searchList = searchToken(tradingTokens, search);
        if (searchList.length === 0 && isAddress(searchTrim)) {
          const token = await getTokenDetail(searchTrim);

          console.log(token);
          if (token) {
            const findToken = externalTokens.find(
              (externalToken) => externalToken.address === token.address
            );

            if (!findToken) {
              set("tradingTokens", [...externalTokens, token]);
            }
            setTokenList([token]);
            setNewTokenAdded(true);
          }
        } else {
          setTokenList(searchList);
          setNewTokenAdded(false);
        }
      }
    };

    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, newTokenAdded]);

  return { tokenList, newTokenAdded, removeToken };
};

export default useTokenSearch;

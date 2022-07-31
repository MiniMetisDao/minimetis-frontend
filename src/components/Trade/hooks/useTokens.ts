import * as React from "react";

import tradingTokens from "config/tradingTokens.json";
import { useGetWalletDetails } from "queries";
import { Token } from "types/common";
import { useMultiCallContract } from "utils";

export const useTokens = () => {
  const { data: walletDetails } = useGetWalletDetails();

  const { data: tokenBalances } = useMultiCallContract(
    "tokens",
    tradingTokens.map(({ address }) => ({
      address,
      method: "balanceOf",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      params: [walletDetails?.address!],
    })),
    {
      enabled: Boolean(walletDetails?.address),
    }
  );

  const tokensList: Token[] = React.useMemo(() => {
    if (!tokenBalances) {
      return tradingTokens;
    }

    return tradingTokens.map((token, idx) => ({
      ...token,
      balance: tokenBalances[idx],
    }));
  }, [tokenBalances]);

  return tokensList;
};

import * as React from "react";

import tokens from "config/tokens.json";
import { useGetWalletDetails } from "queries";
import { useMultiCallContract } from "utils";

export type Token = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logo: string;
  listInQuickView?: boolean;
  balance?: number;
};

export const useTokens = () => {
  const { data: walletDetails } = useGetWalletDetails();

  const { data: tokenBalances } = useMultiCallContract(
    "tokens",
    tokens.map(({ address }) => ({
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
      return tokens;
    }

    return tokens.map((token, idx) => ({
      ...token,
      balance: tokenBalances[idx],
    }));
  }, [tokenBalances]);

  return tokensList;
};

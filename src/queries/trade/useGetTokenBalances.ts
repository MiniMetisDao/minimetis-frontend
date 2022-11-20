import React from "react";

import { useGetWalletDetails } from "queries/walletDetails";
import { type Token } from "types/common";
import { useMultiCallContract } from "utils/multicall";

type Balance = { [token: string]: string };
const balanceQueryMapper = (tokenAddress: string, userAddress?: string) => ({
  address: tokenAddress,
  method: "balanceOf",
  params: userAddress ? [userAddress] : [],
});

export const useGetTokenBalances = ({
  tokens,
  refetchInterval,
}: {
  tokens: Token[];
  refetchInterval?: boolean;
}) => {
  const { data: walletDetails } = useGetWalletDetails();

  const tokenParams = React.useMemo(() => {
    return tokens.map((token) =>
      balanceQueryMapper(token.address, walletDetails?.address)
    );
  }, [tokens, walletDetails?.address]);

  return useMultiCallContract<Balance>(
    ["tradeQuery", "tokenBalances"],
    tokenParams,
    {
      enabled: Boolean(walletDetails?.address),
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchInterval: refetchInterval ? 5_000 : false,
      select: (response) =>
        response.reduce((acc: Balance, balance: string, i: number) => {
          acc[tokenParams[i].address] = balance;

          return acc;
        }, {}),
    }
  );
};

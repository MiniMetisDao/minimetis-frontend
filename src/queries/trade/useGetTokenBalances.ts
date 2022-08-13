import React from "react";

import { useGetWalletDetails } from "queries";
import { Token } from "types/common";
import { useMultiCallContract } from "utils";

type Balance = { [token: string]: string };
type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: Balance;
};

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
}): Result => {
  const { data: walletDetails } = useGetWalletDetails();

  const tokenParams = React.useMemo(() => {
    return tokens.map((token) =>
      balanceQueryMapper(token.address, walletDetails?.address)
    );
  }, [tokens, walletDetails?.address]);

  return useMultiCallContract(["tokenBalances", tokenParams], tokenParams, {
    enabled: Boolean(walletDetails?.address),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchInterval: refetchInterval ? 5_000 : false,
    select: (response) =>
      response.reduce((acc: Balance, balance: string, i: number) => {
        acc[tokenParams[i].address] = balance;

        return acc;
      }, {}),
  });
};
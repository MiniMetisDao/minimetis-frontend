import { getHumanReadableAmount } from "utils";

import { useGetTokenPairs } from "./useGetTokenPairs";

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: {
    metis: string;
    miniMe: string;
  };
};

export const useGetTokenPrice = (): Result => {
  const { data, isLoading, isError } = useGetTokenPairs();

  if (!data) {
    return { isLoading, isError };
  }

  const { metisBaseTokenPair, metisMinimePair } = data;

  const metisPriceInDollars = getHumanReadableAmount(
    metisBaseTokenPair.baseTokenAmount.amount,
    metisBaseTokenPair.baseTokenAmount.decimals
  ).div(
    getHumanReadableAmount(
      metisBaseTokenPair.metisAmount.amount,
      metisBaseTokenPair.metisAmount.decimals
    )
  );

  const miniMePriceInMetis = getHumanReadableAmount(
    metisMinimePair.metisAmount.amount,
    metisMinimePair.metisAmount.decimals
  ).div(
    getHumanReadableAmount(
      metisMinimePair.miniMeAmount.amount,
      metisMinimePair.miniMeAmount.decimals
    )
  );

  const miniMePriceInDollars =
    miniMePriceInMetis.multipliedBy(metisPriceInDollars);

  return {
    isLoading,
    isError,
    data: {
      metis: metisPriceInDollars.toFixed(),
      miniMe: miniMePriceInDollars.toFixed(),
    },
  };
};

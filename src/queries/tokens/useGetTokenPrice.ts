import { getBigNumberAmount } from "utils";

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

  const metisPriceInDollars = getBigNumberAmount(
    metisBaseTokenPair.baseTokenAmount.amount,
    metisBaseTokenPair.baseTokenAmount.decimals
  ).div(
    getBigNumberAmount(
      metisBaseTokenPair.metisAmount.amount,
      metisBaseTokenPair.metisAmount.decimals
    )
  );

  const miniMePriceInMetis = getBigNumberAmount(
    metisMinimePair.metisAmount.amount,
    metisMinimePair.metisAmount.decimals
  ).div(
    getBigNumberAmount(
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

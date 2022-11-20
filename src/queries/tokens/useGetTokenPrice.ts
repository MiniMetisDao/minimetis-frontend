import { getHumanReadableAmount } from "utils/common";

import { useGetTokenPairs } from "./useGetTokenPairs";

export const useGetTokenPrice = () => {
  const { data, ...rest } = useGetTokenPairs();

  if (!data) {
    return { data, ...rest };
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
    data: {
      metis: metisPriceInDollars.toFixed(),
      miniMe: miniMePriceInDollars.toFixed(),
    },
    ...rest,
  };
};

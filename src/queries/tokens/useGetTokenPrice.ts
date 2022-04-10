import { Decimals } from "config";

import { useGetTokenPairs } from "./useGetTokenPairs";

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: {
    metis: number;
    miniMetis: number;
  };
};

export const useGetTokenPrice = (): Result => {
  const { data, isLoading, isError } = useGetTokenPairs();

  if (!data) {
    return { isLoading, isError };
  }

  const { metisUsdtPair, metisMinimetisPair } = data;

  // prettier-ignore
  const metisPriceInDollars = 
    (metisUsdtPair.usdtTokens / Decimals.usdt) / (metisUsdtPair.metisTokens / Decimals.metis);

  // prettier-ignore
  let miniMetisPriceInDollars = 
    (metisMinimetisPair.metisTokens / Decimals.metis) / (metisMinimetisPair.miniMetisTokens / Decimals.miniMetis);

  miniMetisPriceInDollars *= metisPriceInDollars;

  return {
    isLoading,
    isError,
    data: {
      metis: metisPriceInDollars,
      miniMetis: miniMetisPriceInDollars,
    },
  };
};

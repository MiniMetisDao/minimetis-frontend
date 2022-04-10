import { Decimals } from "config";

import { useGetTokenPairs } from "./useGetTokenPairs";

export const useGetTokenPrice = () => {
  const tokenPairs = useGetTokenPairs();

  if (!tokenPairs.data) {
    return tokenPairs;
  }

  const { metisUsdtPair, metisMinimetisPair } = tokenPairs.data;

  // prettier-ignore
  const metisPriceInDollars = 
    (metisUsdtPair.usdtTokens / Decimals.usdt) / (metisUsdtPair.metisTokens / Decimals.metis);

  // prettier-ignore
  let miniMetisPriceInDollars = 
    (metisMinimetisPair.metisTokens / Decimals.metis) / (metisMinimetisPair.miniMetisTokens / Decimals.miniMetis);

  miniMetisPriceInDollars *= metisPriceInDollars;

  return {
    ...tokenPairs,
    data: {
      metis: metisPriceInDollars,
      miniMetis: miniMetisPriceInDollars,
    },
  };
};

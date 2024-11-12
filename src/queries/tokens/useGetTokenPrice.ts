import { type TokenPrices } from "types/common";
import { getHumanReadableAmount } from "utils/common";

import { useGetTokenPairs } from "./useGetTokenPairs";

export const useGetTokenPrice = () => {
  const { data, ...rest } = useGetTokenPairs();

  if (!data) {
    return { data, ...rest };
  }

  const { metisBaseTokenPair, metisMinimePair, metisEthPair } = data;

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

  const ethPriceInMetis = getHumanReadableAmount(
    metisEthPair.metisAmount.amount,
    metisEthPair.metisAmount.decimals
  ).div(
    getHumanReadableAmount(
      metisEthPair.ethAmount.amount,
      metisEthPair.ethAmount.decimals
    )
  );

  const ethPriceInDollars = metisPriceInDollars.multipliedBy(ethPriceInMetis);

  const miniMePriceInDollars =
    miniMePriceInMetis.multipliedBy(metisPriceInDollars);

  const tokenPrices: TokenPrices = {
    METIS: metisPriceInDollars.toFixed(18),
    MINIME: miniMePriceInDollars.toFixed(18),
    WETH: ethPriceInDollars.toFixed(18),
  };

  console.log(tokenPrices);

  return {
    data: tokenPrices,
    ...rest,
  };
};

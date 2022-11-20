import {
  METIS_CONTRACT_ADDRESS,
  METIS_TOKEN_DECIMALS,
  MINIME_CONTRACT_ADDRESS,
} from "config";
import { useGetMinimeConstants } from "queries/minimeConstants";
import { type TokenAmount } from "types/common";
import { useMultiCallContract } from "utils/multicall";

type TreasuryData = {
  miniMe: TokenAmount;
  metis: TokenAmount;
};

const selector = (response: string[]): TreasuryData => ({
  miniMe: { amount: response[0], decimals: METIS_TOKEN_DECIMALS },
  metis: { amount: response[1], decimals: METIS_TOKEN_DECIMALS },
});

export const useGetTreasury = () => {
  const { data: minimeConstants } = useGetMinimeConstants();

  return useMultiCallContract<TreasuryData>(
    ["treasuryQuery", "treasury"],
    [
      {
        address: MINIME_CONTRACT_ADDRESS,
        method: "balanceOf",
        params: [minimeConstants?.treasuryFeeReceiver],
      },
      {
        address: METIS_CONTRACT_ADDRESS,
        method: "balanceOf",
        params: [minimeConstants?.treasuryFeeReceiver],
      },
    ],
    {
      select: selector,
      enabled: Boolean(minimeConstants?.treasuryFeeReceiver),
    }
  );
};

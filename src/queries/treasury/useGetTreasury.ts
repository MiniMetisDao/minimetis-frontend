import {
  METIS_CONTRACT_ADDRESS,
  METIS_TOKEN_DECIMALS,
  MINIME_CONTRACT_ADDRESS,
} from "config";
import { useMinimeConstants } from "queries";
import { TokenAmount } from "types/common";
import { useMultiCallContract } from "utils";

type TreasuryData = {
  miniMe: TokenAmount;
  metis: TokenAmount;
};

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: TreasuryData;
};

export const useGetTreasury = (): Result => {
  const { data: minimeConstants, isLoading, isError } = useMinimeConstants();

  const treasuryData = useMultiCallContract(
    "treasury",
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
      enabled: Boolean(minimeConstants?.treasuryFeeReceiver),
    }
  );

  let data: TreasuryData | undefined;
  if (treasuryData.data) {
    data = {
      miniMe: { amount: treasuryData.data[0], decimals: METIS_TOKEN_DECIMALS },
      metis: { amount: treasuryData.data[1], decimals: METIS_TOKEN_DECIMALS },
    };
  }

  return { isLoading, isError, data };
};

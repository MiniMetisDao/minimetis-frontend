import { METIS_CONTRACT_ADDRESS, MINIMETIS_CONTRACT_ADDRESS } from "config";
import { useMinimeConstants } from "queries";
import { useMultiCallContract } from "utils";

type TreasuryData = {
  miniMetisTokens: number;
  metisTokens: number;
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
        address: MINIMETIS_CONTRACT_ADDRESS,
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
      miniMetisTokens: treasuryData.data[0],
      metisTokens: treasuryData.data[1],
    };
  }

  return { isLoading, isError, data };
};

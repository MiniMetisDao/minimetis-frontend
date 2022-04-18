import { DistributorAbi } from "config";
import { useMinimeConstants } from "queries";
import { useGetWalletDetails } from "queries/walletDetails";
import { useMultiCallContract } from "utils";

type DistributorData = {
  totalShares: number;
  shares: number;
  sharePercentage: number;
  claimedDividend: number;
  unclaimedDividend: number;
  totalDistributed: number;
};

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: Partial<DistributorData>;
};

export const useGetDividendShare = (): Result => {
  const { data: minimeConstants, isLoading, isError } = useMinimeConstants();
  const { data: userData } = useGetWalletDetails();

  const distibutorUserData = useMultiCallContract(
    "distributorUser",
    [
      {
        address: minimeConstants?.distributor,
        method: "shares",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [userData?.address!],
        abi: DistributorAbi,
      },
      {
        address: minimeConstants?.distributor,
        method: "getUnpaidEarnings",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [userData?.address!],
        abi: DistributorAbi,
      },
    ],
    {
      refetchInterval: 5_000,
      enabled: Boolean(minimeConstants?.distributor && userData?.address),
    }
  );

  const distibutorData = useMultiCallContract(
    "distributor",
    [
      {
        address: minimeConstants?.distributor,
        method: "totalShares",
        abi: DistributorAbi,
      },
      {
        address: minimeConstants?.distributor,
        method: "totalDistributed",
        abi: DistributorAbi,
      },
    ],
    {
      refetchInterval: 5_000,
      enabled: Boolean(minimeConstants?.distributor),
    }
  );

  let data: DistributorData | undefined;

  if (distibutorUserData.data && distibutorData.data) {
    data = {
      totalShares: distibutorData.data[0],
      totalDistributed: distibutorData.data[1],
      shares: distibutorUserData.data[0],
      sharePercentage:
        (distibutorUserData.data[0].split(",")[0] / distibutorData.data[0]) *
        100,
      claimedDividend: distibutorUserData.data[0].split(",")[2],
      unclaimedDividend: distibutorUserData.data[1],
    };
  }

  return { isLoading, isError, data };
};

import { DistributorAbi } from "config";
import { useMinimeConstants } from "queries";
import { useGetWalletDetails } from "queries/walletDetails";
import { useMultiCallContract } from "utils";

type DistributorShare = {
  totalShares: number;
  totalDistributed: number;

  userData?: {
    sharePercentage: number;
    shares: number;
    claimedDividend: number;
    unclaimedDividend: number;
  };
};

type Result = {
  isLoading: boolean;
  isError: boolean;
  data?: DistributorShare;
};

export const useGetDividendShare = (): Result => {
  const { data: minimeConstants, isLoading, isError } = useMinimeConstants();
  const { data: walletDetails } = useGetWalletDetails();

  const distributorUserQuery = useMultiCallContract(
    "distributorUser",
    [
      {
        address: minimeConstants?.distributor,
        method: "shares",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [walletDetails?.address!],
        abi: DistributorAbi,
      },
      {
        address: minimeConstants?.distributor,
        method: "getUnpaidEarnings",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [walletDetails?.address!],
        abi: DistributorAbi,
      },
    ],
    {
      refetchInterval: 5_000,
      enabled: Boolean(minimeConstants?.distributor && walletDetails?.address),
    }
  );

  const distibutorQuery = useMultiCallContract(
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

  let data: DistributorShare | undefined;

  if (distibutorQuery.data) {
    data = {
      totalShares: distibutorQuery.data[0],
      totalDistributed: distibutorQuery.data[1],

      userData: distributorUserQuery.data
        ? {
            shares: distributorUserQuery.data[0],
            sharePercentage:
              (distributorUserQuery.data[0].split(",")[0] /
                distibutorQuery.data[0]) *
              100,
            claimedDividend: distributorUserQuery.data[0].split(",")[2],
            unclaimedDividend: distributorUserQuery.data[1],
          }
        : undefined,
    };
  }

  return { isLoading, isError, data };
};

import { DistributorAbi, METIS_TOKEN_DECIMALS } from "config";
import { useMinimeConstants } from "queries";
import { useGetWalletDetails } from "queries/walletDetails";
import { TokenAmount } from "types/common";
import { useMultiCallContract } from "utils";

type DistributorShare = {
  totalShares: string;
  totalDistributed: TokenAmount;

  userData?: {
    sharePercentage: string;
    shares: string;
    claimedDividend: TokenAmount;
    unclaimedDividend: TokenAmount;
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
      enabled: Boolean(minimeConstants?.distributor),
    }
  );

  let data: DistributorShare | undefined;

  if (distibutorQuery.data) {
    data = {
      totalShares: distibutorQuery.data[0],
      totalDistributed: {
        amount: distibutorQuery.data[1],
        decimals: METIS_TOKEN_DECIMALS,
      },

      userData: distributorUserQuery.data
        ? {
            shares: distributorUserQuery.data[0],
            sharePercentage: (
              (distributorUserQuery.data[0].split(",")[0] /
                distibutorQuery.data[0]) *
              100
            ).toString(),
            claimedDividend: {
              amount: distributorUserQuery.data[0].split(",")[2],
              decimals: minimeConstants?.decimals,
            },
            unclaimedDividend: {
              amount: distributorUserQuery.data[1],
              decimals: minimeConstants?.decimals,
            },
          }
        : undefined,
    };
  }

  return { isLoading, isError, data };
};

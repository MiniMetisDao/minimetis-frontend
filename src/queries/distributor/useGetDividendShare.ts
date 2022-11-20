import BigNumber from "bignumber.js";

import { METIS_TOKEN_DECIMALS, distributorAbi } from "config";
import { useGetMinimeConstants } from "queries/minimeConstants";
import { useGetWalletDetails } from "queries/walletDetails";
import { type TokenAmount } from "types/common";
import { getAmount } from "utils/common";
import { useMultiCallContract } from "utils/multicall";

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

export const useGetDividendShare = () => {
  const { data: minimeConstants } = useGetMinimeConstants();
  const { data: walletDetails } = useGetWalletDetails();

  const { data: distributorUserDetails, ...rest } = useMultiCallContract<
    string[]
  >(
    ["distributorQuery", "distributorUserDetails"],
    [
      {
        address: minimeConstants?.distributor,
        method: "shares",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [walletDetails?.address!],
        abi: distributorAbi,
      },
      {
        address: minimeConstants?.distributor,
        method: "getUnpaidEarnings",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        params: [walletDetails?.address!],
        abi: distributorAbi,
      },
    ],
    {
      enabled: Boolean(minimeConstants?.distributor && walletDetails?.address),
    }
  );

  const { data: distibutorDetails } = useMultiCallContract<string[]>(
    ["distributorQuery", "distributorDetails"],
    [
      {
        address: minimeConstants?.distributor,
        method: "totalShares",
        abi: distributorAbi,
      },
      {
        address: minimeConstants?.distributor,
        method: "totalDistributed",
        abi: distributorAbi,
      },
    ],
    {
      enabled: Boolean(minimeConstants?.distributor),
    }
  );

  let data: DistributorShare | undefined;

  if (distibutorDetails) {
    data = {
      totalShares: distibutorDetails[0],
      totalDistributed: {
        amount: BigNumber(distibutorDetails[1])
          .plus(getAmount("1422", METIS_TOKEN_DECIMALS)) // add v1 contracts amount (manually added) minime v1: 0x6d8534326415Ff9966b387615e576A109aC01AC1
          .toString(),
        decimals: METIS_TOKEN_DECIMALS,
      },

      userData: distributorUserDetails
        ? {
            shares: distributorUserDetails[0],
            sharePercentage: BigNumber(distributorUserDetails[0].split(",")[0])
              .dividedBy(distibutorDetails[0])
              .multipliedBy(100)
              .toFixed(),
            claimedDividend: {
              amount: distributorUserDetails[0].split(",")[2],
              decimals: minimeConstants?.decimals,
            },
            unclaimedDividend: {
              amount: distributorUserDetails[1],
              decimals: minimeConstants?.decimals,
            },
          }
        : undefined,
    };
  }

  return { data, ...rest };
};

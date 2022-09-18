import { DistributorAbi } from "config";
import { useMinimeConstants } from "queries";
import { type TransactionParams, useExecuteTransaction } from "utils";

export const useUpgradeToken = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { data: minimeConstants } = useMinimeConstants();

  const { mutate, ...rest } = useExecuteTransaction(
    ["upgradeToken"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: () => {
      return mutate({
        contractDetails: {
          abi: DistributorAbi, // change to upgrad contract abi
          address: minimeConstants?.distributor, // change to update contract address
          method: "claimDividend", // change to upgrade method
        },
      });
    },
    ...rest,
  };
};

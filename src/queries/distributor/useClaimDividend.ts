import { DistributorAbi } from "config";
import { useMinimeConstants } from "queries";
import { type TransactionParams, useExecuteTransaction } from "utils";

export const useClaimDividend = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { data: minimeConstants } = useMinimeConstants();

  const { mutate, ...rest } = useExecuteTransaction(
    ["claimDividend"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: () => {
      return mutate({
        contractDetails: {
          abi: DistributorAbi,
          address: minimeConstants?.distributor,
          method: "claimDividend",
        },
      });
    },
    ...rest,
  };
};

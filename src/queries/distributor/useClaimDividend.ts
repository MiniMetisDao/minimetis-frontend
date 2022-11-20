import { distributorAbi } from "config";
import { useMinimeConstants } from "queries/minimeConstants";
import {
  type TransactionParams,
  useExecuteTransaction,
} from "utils/transaction";

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
          abi: distributorAbi,
          address: minimeConstants?.distributor,
          method: "claimDividend",
        },
      });
    },
    ...rest,
  };
};

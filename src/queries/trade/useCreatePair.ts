import { FACTORY_CONTRACT_ADDRESS, factoryAbi } from "config";
import {
  type TransactionParams,
  useExecuteTransaction,
} from "utils/transaction";

export const useCreatePair = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { mutate, ...rest } = useExecuteTransaction(
    ["useCreatePair"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: ({ method, params }: { method: string; params: any }) => {
      return mutate({
        contractDetails: {
          address: FACTORY_CONTRACT_ADDRESS,
          abi: factoryAbi,
          method,
        },
        params,
      });
    },
    ...rest,
  };
};

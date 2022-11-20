import { ROUTER_CONTRACT_ADDRESS, routerAbi } from "config";
import {
  type TransactionParams,
  useExecuteTransaction,
} from "utils/transaction";

export const useTokenSwap = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { mutate, ...rest } = useExecuteTransaction(
    ["tokenSwap"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: ({ method, params }: { method: string; params: any }) => {
      return mutate({
        contractDetails: {
          address: ROUTER_CONTRACT_ADDRESS,
          abi: routerAbi,
          method,
        },
        params,
      });
    },
    ...rest,
  };
};

import { ROUTER_CONTRACT_ADDRESS, routerAbi } from "config";
import {
  type TransactionParams,
  useExecuteTransaction,
} from "utils/transaction";

export const useAddLiquidity = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { mutate, ...rest } = useExecuteTransaction(
    ["liquidityAdd"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: ({
      method,
      params,
      value,
    }: {
      method: string;
      params: any;
      value?: string;
    }) => {
      return mutate({
        contractDetails: {
          address: ROUTER_CONTRACT_ADDRESS,
          abi: routerAbi,
          method,
        },
        params,
        value,
      });
    },
    ...rest,
  };
};

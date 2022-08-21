import { constants } from "ethers";

import { ROUTER_CONTRACT_ADDRESS } from "config";
import { Token } from "types/common";
import { TransactionParams, useExecuteTransaction } from "utils";

export const useTokenApproval = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { mutate, ...rest } = useExecuteTransaction(
    ["tokenApproval"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: async ({ tokenAddress }: { tokenAddress: Token["address"] }) => {
      return mutate({
        contractDetails: { address: tokenAddress, method: "approve" },
        params: [ROUTER_CONTRACT_ADDRESS, constants.MaxUint256],
      });
    },
    ...rest,
  };
};

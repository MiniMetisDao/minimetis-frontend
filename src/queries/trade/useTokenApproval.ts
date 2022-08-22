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
    mutate: ({
      tokenAddress,
      tokenAmount,
    }: {
      tokenAddress: Token["address"];
      tokenAmount?: string;
    }) => {
      return mutate({
        contractDetails: { address: tokenAddress, method: "approve" },
        params: [ROUTER_CONTRACT_ADDRESS, tokenAmount ?? constants.MaxUint256],
      });
    },
    ...rest,
  };
};

import { constants } from "ethers";

import {
  MINIME_CONTRACT_ADDRESS_V1,
  MINIME_UPGRADE_CONTRACT_ADDRESS,
} from "config";
import { TransactionParams, useExecuteTransaction } from "utils";

export const useUpgradeTokenApproval = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { mutate, ...rest } = useExecuteTransaction(
    ["upgradeTokenApproval"],
    onTransactionStart,
    onTransactionSuccess,
    onError
  );

  return {
    mutate: () => {
      return mutate({
        contractDetails: {
          address: MINIME_CONTRACT_ADDRESS_V1,
          method: "approve",
        },
        params: [MINIME_UPGRADE_CONTRACT_ADDRESS, constants.MaxUint256],
      });
    },
    ...rest,
  };
};

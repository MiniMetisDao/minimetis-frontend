import { MINIME_UPGRADE_CONTRACT_ADDRESS, tokenUpgradeAbi } from "config";
import { useGetWalletDetails } from "queries/walletDetails";
import {
  type TransactionParams,
  useExecuteTransaction,
} from "utils/transaction";

export const useUpgradeToken = ({
  onTransactionStart,
  onTransactionSuccess,
  onError,
}: TransactionParams) => {
  const { data: walletDetails } = useGetWalletDetails();

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
          abi: tokenUpgradeAbi,
          address: MINIME_UPGRADE_CONTRACT_ADDRESS,
          method: "migrateToNewToken",
        },
        params: [walletDetails?.address],
      });
    },
    ...rest,
  };
};

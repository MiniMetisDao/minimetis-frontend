import { DistributorAbi } from "config";
import { useMinimeConstants } from "queries";
import { type Details, useExecuteTransaction } from "utils";

type Params = {
  onTransactionStart: (details: Details) => void;
  onTransactionSucess: (details: Details) => void;
  onError: (error: any) => void;
};

export const useClaimDividend = ({
  onTransactionStart,
  onTransactionSucess,
  onError,
}: Params) => {
  const { data: minimeConstants } = useMinimeConstants();

  return useExecuteTransaction(
    ["claimDividend"],
    {
      abi: DistributorAbi,
      address: minimeConstants?.distributor,
      method: "claimDividend",
    },
    onTransactionStart,
    onTransactionSucess,
    onError
  );
};

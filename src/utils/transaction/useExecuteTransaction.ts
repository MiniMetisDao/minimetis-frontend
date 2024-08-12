import { useMutation } from "@tanstack/react-query";

import { ERC20Abi, EXPLORER_URL } from "config";
import { type BigNumber, ethers } from "ethers";
import { useWalletConnector } from "queries/connect";
import { getShortTransactionHash } from "utils/common";

export type ContractDetails = {
  address: string;
  abi?: any;
  method: string;
  // TODO: check if params is required anymore here?
  params?: Array<string | number | BigNumber>;
};

export type TransactionDetails = {
  hash: string;
  shortHash: string;
  explorerUrl: string;
};

export type TransactionParams = {
  onTransactionStart: (details: TransactionDetails) => void;
  onTransactionSuccess: (details: TransactionDetails) => void;
  onError: (error: any) => void;
};

export type MutateParams = {
  contractDetails: ContractDetails;
  params?: any;
  value?: string;
};
export const useExecuteTransaction = (
  mutationKey: string[],
  onTransactionStart: (details: TransactionDetails) => void,
  onTransactionSuccess: (details: TransactionDetails) => void,
  onError: (error: any) => void
) => {
  const isConnected = useWalletConnector();

  const execute = async ({ contractDetails, params, value }: MutateParams) => {
    const isWalletConnected = await isConnected();
    if (!isWalletConnected) {
      onError({ code: 4001 });

      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractDetails.address,
      contractDetails.abi ?? ERC20Abi,
      signer.connectUnchecked()
    );

    const txParams = value ? { value } : {};

    const tx = await contract[contractDetails.method](
      ...(params ?? []),
      txParams
    );

    const txHash = tx.hash;

    const details = {
      hash: txHash,
      shortHash: getShortTransactionHash(txHash),
      explorerUrl: `${EXPLORER_URL}tx/${txHash}`,
    };

    onTransactionStart(details);

    const result = await tx.wait();
    if (result?.status === 0) {
      onError({ code: 0 });
    } else {
      onTransactionSuccess(details);
    }
  };

  return useMutation(execute, { onError, mutationKey });
};

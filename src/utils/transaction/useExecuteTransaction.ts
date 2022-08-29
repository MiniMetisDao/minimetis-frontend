import { useMutation } from "@tanstack/react-query";

import { ERC20Abi, EXPLORER_URL } from "config";
import { BigNumber, ethers } from "ethers";
import { useWalletConnector } from "queries/connect";
import { getShortTransactionHash } from "utils";

export type ContractDetails = {
  address: string;
  abi?: any;
  method: string;
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
};
export const useExecuteTransaction = (
  mutationKey: string[],
  onTransactionStart: (details: TransactionDetails) => void,
  onTransactionSuccess: (details: TransactionDetails) => void,
  onError: (error: any) => void
) => {
  const isConnected = useWalletConnector();

  const execute = async ({ contractDetails, params }: MutateParams) => {
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

    console.log("gasEstimate");

    const gasEstimate = await contract.estimateGas[contractDetails.method](
      ...(params ?? [])
    );

    const tx = await contract[contractDetails.method](...(params ?? []), {
      gasLimit: gasEstimate.toNumber(),
    });

    const txHash = tx.hash;

    const details = {
      hash: txHash,
      shortHash: getShortTransactionHash(txHash),
      explorerUrl: `${EXPLORER_URL}tx/${txHash}`,
    };

    onTransactionStart(details);

    await tx.wait();

    onTransactionSuccess(details);
  };

  return useMutation(mutationKey, execute, {
    onError,
  });
};

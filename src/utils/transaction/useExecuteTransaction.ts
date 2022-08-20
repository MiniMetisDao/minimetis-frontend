import { useMutation } from "@tanstack/react-query";

import { ERC20Abi, EXPLORER_URL } from "config";
import { ethers } from "ethers";
import { getShortTransactionHash } from "utils";

export type ContractDetails = {
  address: string;
  abi?: any;
  method: string;
  params?: Array<string | number>;
};

export type Details = {
  hash: string;
  shortHash: string;
  explorerUrl: string;
};

export const useExecuteTransaction = (
  mutationKey: string[],
  contractDetails: ContractDetails,
  onTransactionStart: (details: Details) => void,
  onTransactionSucess: (details: Details) => void,
  onError: (error: any) => void
) => {
  const execute = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractDetails.address,
      contractDetails.abi ?? ERC20Abi,
      signer.connectUnchecked()
    );

    const tx = await contract[contractDetails.method](
      ...(contractDetails.params ?? [])
    );

    const txHash = tx.hash;

    const details = {
      hash: txHash,
      shortHash: getShortTransactionHash(txHash),
      explorerUrl: `${EXPLORER_URL}tx/${txHash}`,
    };

    onTransactionStart(details);

    await tx.wait();

    onTransactionSucess(details);
  };

  return useMutation(mutationKey, execute, {
    onError,
  });
};

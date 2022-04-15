import { ethers } from "ethers";
import { useMutation } from "react-query";

import { DistributorAbi } from "config";
import { useMinimeConstants } from "queries";

const claimDividend = async (distributor: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    distributor,
    DistributorAbi,
    signer.connectUnchecked()
  );

  const tx = await contract.claimDividend();
  const txHash = tx.hash;
  const txReceipt = tx.wait();

  return { txHash, txReceipt };
};

export const useClaimDividend = () => {
  const { data: minimeConstants } = useMinimeConstants();

  return useMutation("claimDividend", async () =>
    claimDividend(minimeConstants?.distributor)
  );
};

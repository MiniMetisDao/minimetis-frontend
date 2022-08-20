import { useMutation } from "@tanstack/react-query";
import { constants, ethers } from "ethers";

import { ERC20Abi, ROUTER_CONTRACT_ADDRESS } from "config";
import { Token } from "types/common";

type Result = Promise<{ txHash: string; txReceipt: Promise<void> }>;

const tokenApproval = async (tokenAddress: Token["address"]): Result => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    tokenAddress,
    ERC20Abi,
    signer.connectUnchecked()
  );

  const tx = await contract.approve(
    ROUTER_CONTRACT_ADDRESS,
    constants.MaxUint256
  );

  const txHash = tx.hash;
  const txReceipt = tx.wait();

  return { txHash, txReceipt };
};

export const useTokenApproval = ({
  tokenAddress,
}: {
  tokenAddress: Token["address"];
}) => {
  return useMutation(["tokenApproval"], async () =>
    tokenApproval(tokenAddress)
  );
};

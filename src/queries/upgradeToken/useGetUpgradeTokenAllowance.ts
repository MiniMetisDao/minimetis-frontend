import {
  MINIME_CONTRACT_ADDRESS_V1,
  MINIME_UPGRADE_CONTRACT_ADDRESS,
} from "config";
import { useGetWalletDetails } from "queries/walletDetails";
import { useMultiCallContract } from "utils";

export const useGetUpgradeTokenAllowance = () => {
  const { data: walletDetails } = useGetWalletDetails();

  const tokenParams = {
    address: MINIME_CONTRACT_ADDRESS_V1,
    method: "allowance",
    params: walletDetails?.address
      ? [walletDetails?.address, MINIME_UPGRADE_CONTRACT_ADDRESS]
      : [],
  };

  return useMultiCallContract<string>(
    ["upgradeTokenQuery", "upgradeTokenAllowance"],
    tokenParams,
    {
      enabled: Boolean(walletDetails?.address),
    }
  );
};

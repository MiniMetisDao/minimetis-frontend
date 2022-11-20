import { useTranslation } from "react-i18next";

import { Button } from "components/shared/Button";
import { useGetWalletDetails } from "queries/walletDetails";
import { useWalletStore } from "store/wallet";
import { connectWallet, switchNetwork } from "utils/ethers";

export const ConnectButton: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetWalletDetails();
  const setWalletLogin = useWalletStore((state) => state.login);

  const handleClick = async () => {
    if (data?.status === "CONNECTED") {
      return;
    }
    if (data?.status === "INVALID_NETWORK") {
      await switchNetwork();
      await connectWallet();
    } else {
      await connectWallet();
    }
    setWalletLogin();
    refetch();
  };

  if (data?.status === "CONNECTED") return null;

  return (
    <Button onClick={handleClick}>
      {isLoading ? "..." : t("connectWallet")}
    </Button>
  );
};

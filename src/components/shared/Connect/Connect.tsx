import { useTranslation } from "react-i18next";

import { useGetWalletDetails } from "queries/walletDetails";
import { useWalletDetailsStore, useWalletStore } from "store/wallet";
import { connectWallet, switchNetwork } from "utils/ethers";

import { styles } from "./styles";

export const Connect: React.FC = () => {
  const { t } = useTranslation();
  const setWalletModalOpen = useWalletDetailsStore((state) => state.setOpen);
  const setWalletLogin = useWalletStore((state) => state.login);

  const { isLoading, data, error, refetch } = useGetWalletDetails();

  const handleConnectWallet = async () => {
    if (data?.status === "CONNECTED") {
      setWalletModalOpen(true);

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

  let text: string;

  if (isLoading) {
    text = "...";
  } else if (error || !data) {
    text = t("connectWallet");
  } else {
    text =
      data?.shortAddress ||
      (data?.status === "INVALID_NETWORK"
        ? t("switchWallet")
        : t("connectWallet"));
  }

  return (
    <div css={styles}>
      {data && (
        <div
          className={
            data?.status === "INVALID_NETWORK"
              ? "connection-info cry"
              : "connection-info"
          }
        >
          {t(`connectionDetails.${data.status}`)}
        </div>
      )}
      <button onClick={handleConnectWallet}>
        <span>{text}</span>
      </button>
    </div>
  );
};

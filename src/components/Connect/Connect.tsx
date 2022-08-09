import { useTranslation } from "react-i18next";

import { useGetWalletDetails } from "queries";
import { connectWallet, switchNetwork } from "utils";

import { styles } from "./styles";

export const Connect: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading, data, error, refetch } = useGetWalletDetails();

  const handleConnectWallet = async () => {
    if (data?.status === "CONNECTED") {
      return;
    }
    if (data?.status === "INVALID_NETWORK") {
      await switchNetwork();
      await connectWallet();
    } else {
      await connectWallet();
    }
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

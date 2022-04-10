import { Interpolation, Theme } from "@emotion/react";
import { useGetWalletDetails } from "queries";
import { useTranslation } from "react-i18next";
import { connectWallet, switchNetwork } from "utils";
import { styles } from "./styles";

export const ConnectWallet: React.FunctionComponent<{
  css?: Interpolation<Theme>;
}> = (props) => {
  const { t } = useTranslation();
  const { isLoading, data, error, refetch } = useGetWalletDetails();

  const handleConnectWallet = async () => {
    if (data?.status === "CONNECTED") {
      return;
    }
    if (data?.status === "INVALID_NETWORK") {
      await switchNetwork();
    } else {
      await connectWallet();
    }
    refetch();
  };

  let text: string;

  // TODO: Revisit the loading case.
  if (isLoading || error || !data) {
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
      <button {...props} onClick={handleConnectWallet}>
        {text}
      </button>
    </div>
  );
};

import { css, Interpolation, Theme } from "@emotion/react";
import { useGetWalletDetails } from "queries";
import { useTranslation } from "react-i18next";
import { connectWallet } from "utils";
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

    await connectWallet();
    refetch();
  };

  let text: string;

  // TODO: Revisit the loading case.
  if (isLoading || error || !data) {
    text = t("connectWallet");
  } else {
    text = data?.label || t("connectWallet");
  }

  return (
    <div css={styles}>
      {data && (
        <div className="connection-info">
          {t(`connectionDetails.${data.status}`)}
        </div>
      )}
      <button {...props} onClick={handleConnectWallet}>
        {text}
      </button>
    </div>
  );
};

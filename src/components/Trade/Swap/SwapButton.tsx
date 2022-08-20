import { useTranslation } from "react-i18next";

import { Button } from "components/Button";
import { ConnectButton } from "components/Connect";
import { useGetWalletDetails } from "queries";

type SwapButtonProps = {
  hasInputError: boolean;
};

export const SwapButton: React.FC<SwapButtonProps> = ({ hasInputError }) => {
  const { t } = useTranslation("trade");

  const { data: walletDetails } = useGetWalletDetails();

  return walletDetails?.status === "CONNECTED" ? (
    <Button disabled={hasInputError}>{t("swap")}</Button>
  ) : (
    <ConnectButton />
  );
};

import React from "react";
import { useTranslation } from "react-i18next";

import { Modal } from "components/shared/Modal";
import { useGetWalletDetails } from "queries/walletDetails";
import { useWalletStore } from "store/wallet";

import { Button } from "../Button";

import { detailStyles } from "./styles";

type ConnectionDetailsModalProps = {
  onClose: () => void;
};

export const ConnectionDetailsModal: React.FC<ConnectionDetailsModalProps> = ({
  onClose,
}) => {
  const { t } = useTranslation("common");
  const { data } = useGetWalletDetails();
  const setWalletLogout = useWalletStore((state) => state.logout);

  const handleClick = () => {
    setWalletLogout();
    onClose();
  };

  return (
    <Modal onClose={onClose} title={t("connectedWallet")}>
      <div css={detailStyles}>
        <p>
          {t("address")}: {data && data.address}
        </p>
        <p>
          {t("network")}: {data && t(`connectionDetails.${data.status}`)}
        </p>
        <Button onClick={handleClick}>{t("logout")}</Button>
      </div>
    </Modal>
  );
};

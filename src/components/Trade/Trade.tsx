import React from "react";
import { useTranslation } from "react-i18next";

import { Container } from "components/Layout";

import { Swap } from "./Swap";
import { styles } from "./styles";

export type TradeType = {
  TradeComponent: React.ReactNode;
  showbg: boolean;
};

export const Trade: React.FC = () => {
  const { t } = useTranslation("trade");

  return (
    <div css={styles()}>
      <Container topSection>
        <h1>{t("miniSwap")}</h1>
        <Swap />
      </Container>
    </div>
  );
};

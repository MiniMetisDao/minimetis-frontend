import { useTranslation } from "react-i18next";

import { Container } from "components/Layout/Container";

import { styles } from "./styles";

export const LiquidityPool: React.FC = () => {
  const { t } = useTranslation("trade");

  return (
    <div css={styles}>
      <Container topSection>
        <h1>{t("liquidityPool")}</h1>
      </Container>
    </div>
  );
};

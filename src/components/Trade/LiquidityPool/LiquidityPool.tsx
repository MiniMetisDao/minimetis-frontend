import { useTranslation } from "react-i18next";

import { Container } from "components/Layout/Container";
import tradingTokens from "config/trade/tradingTokens.json";
import { useGetLiquidityPools } from "queries/trade/useGetLiquidityPools";

import { styles } from "./styles";

export const LiquidityPool: React.FC = () => {
  const { t } = useTranslation("trade");
  const { data } = useGetLiquidityPools();

  console.log("tradingTokens", tradingTokens, data);

  return (
    <div css={styles}>
      <Container topSection>
        <h1>{t("liquidityPool")}</h1>
      </Container>
    </div>
  );
};

import { useTranslation } from "react-i18next";

import { Container } from "components/Layout";
import { DisplayPrice } from "components/shared/DisplayPrice";
import {
  useGetLiquidityPoolBalances,
  useGetLiquidityPools,
} from "queries/trade";

import { RemoveLiquidityButton } from "./RemoveLiquidityButton";
import { styles } from "./styles";

export const LiquidityPool: React.FC = () => {
  const { t } = useTranslation("trade");
  const { data, isLoading } = useGetLiquidityPools();
  const { data: balances } = useGetLiquidityPoolBalances();

  return (
    <div css={styles}>
      <Container topSection>
        <h1>{t("liquidityPool")}</h1>
        {isLoading && <p>please wait while we fetch the liquidity pools</p>}
        {data &&
          data.map((lp) => (
            <div className="pool-item" key={lp.address}>
              {lp.name} → {lp.address} → Balance:{" "}
              {balances ? (
                <>
                  <DisplayPrice amount={balances[lp.address]} decimals={18} />
                  <div className="btn">
                    <RemoveLiquidityButton
                      hasInputError={balances[lp.address] === "0"}
                      amount={balances[lp.address]}
                      pairAddress={lp.address}
                    />
                  </div>
                </>
              ) : (
                "loading..."
              )}{" "}
            </div>
          ))}
      </Container>
    </div>
  );
};

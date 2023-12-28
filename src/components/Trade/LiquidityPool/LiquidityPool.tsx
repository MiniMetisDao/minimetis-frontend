import { useTranslation } from "react-i18next";

import { Container } from "components/Layout";
import { Button } from "components/shared/Button";
import { DisplayPrice } from "components/shared/DisplayPrice";
import {
  useGetLiquidityPoolBalances,
  useGetLiquidityPools,
} from "queries/trade";

import LiquidityDetails from "./LiquidityDetails";
import { RemoveLiquidityButton } from "./RemoveLiquidityButton";
import YourPools from "./YourPools";
import { styles } from "./styles";

export const LiquidityPool: React.FC = () => {
  const { t } = useTranslation("trade");
  const { data, isLoading } = useGetLiquidityPools();
  const { data: balances } = useGetLiquidityPoolBalances();

  return (
    <div css={styles}>
      <Container topSection className="container">
        <h2>{t("liquidityPool")}</h2>
        <div className="wrapper">
          <Button className="btn">ALL</Button>
          <Button>MY POOL</Button>
        </div>
        <LiquidityDetails liquidity={false} />
        <p className="text-information">
          By adding liquidity you’ll earn 0.25% of all trades on this pair
          proportional to your share of the pool. Try to add liquidity in
          recommend pool.
        </p>
        <YourPools />
        {/* {isLoading && <p>please wait while we fetch the liquidity pools</p>}
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
          ))} */}
      </Container>
    </div>
  );
};

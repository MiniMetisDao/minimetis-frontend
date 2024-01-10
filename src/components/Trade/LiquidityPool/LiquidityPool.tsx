import { useState } from "react";
import { useTranslation } from "react-i18next";

import candies_icon from "assets/images/candies.webp";
import start_icon from "assets/images/star.webp";
import unicorn_icon from "assets/images/unicorn.webp";
import Tabs from "components/shared/Tabs";
import { TabOptions } from "config/trade/constants";
import {
  useGetLiquidityPoolBalances,
  useGetLiquidityPools,
} from "queries/trade";

import LiquidityDetails from "./LiquidityDetails";
import YourPools from "./YourPools";
import { styles } from "./styles";

const { All, FAVORITES, MY } = TabOptions;
export const LiquidityPool: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(All);

  const onSelect = (newTab: TabOptions) => {
    setSelectedTab(newTab);
  };

  const { data, isLoading } = useGetLiquidityPools();
  const { data: balances } = useGetLiquidityPoolBalances();

  return (
    <div css={styles}>
      <Tabs
        tabs={[All, MY, FAVORITES]}
        tabsIcons={[candies_icon, unicorn_icon, start_icon]}
        onSelect={onSelect}
      />
      <LiquidityDetails selectedTab={selectedTab} />
      <p className="text-information">
        By adding liquidity you’ll earn 0.25% of all trades on this pair
        proportional to your share of the pool. Try to add liquidity in
        recommend pool.
      </p>
      <YourPools />
    </div>
  );
};

{
  /* {isLoading && <p>please wait while we fetch the liquidity pools</p>}
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
          ))} */
}

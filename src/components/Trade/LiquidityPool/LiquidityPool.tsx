import { useState } from "react";
import type { LiquidityType } from "utils/types";

import candies_icon from "assets/images/candies.webp";
import start_icon from "assets/images/star.webp";
import unicorn_icon from "assets/images/unicorn.webp";
import Tabs from "components/shared/Tabs";
import { TabOptions } from "config/trade/constants";
import { useGetLiquidityPools } from "queries/trade";

import LiquidityDetails from "./LiquidityDetails";
import YourPools from "./YourPools";
import { styles } from "./styles";

const { All, FAVORITES, MY } = TabOptions;
export const LiquidityPool: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(All);

  const onSelect = (newTab: TabOptions) => {
    setSelectedTab(newTab);
  };

  const { data } = useGetLiquidityPools();

  if (!data) return null;
  const liquidityPairs = data.validPairs as LiquidityType[];

  return (
    <div css={styles}>
      <Tabs
        tabs={[All, MY, FAVORITES]}
        tabsIcons={[candies_icon, unicorn_icon, start_icon]}
        onSelect={onSelect}
      />
      <LiquidityDetails
        selectedTab={selectedTab}
        liquidityPairs={liquidityPairs}
      />
      <p className="text-information">
        By adding liquidity you’ll earn 0.25% of all trades on this pair
        proportional to your share of the pool. Try to add liquidity in
        recommend pool.
      </p>
      <YourPools />
    </div>
  );
};

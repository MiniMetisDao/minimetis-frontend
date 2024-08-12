import { useMemo } from "react";

import minimetisFace from "assets/images/minimetisFace.png";
import { TabOptions } from "config/trade/constants";
import { useLiquidityStore } from "store/useLiquidityStore";
import { type LiquidityType } from "types/common";

import LiquidityList from "./List";

const { All, FAVORITES } = TabOptions;

const LiquidityDetails = ({
  selectedTab,
  liquidityPairs,
}: {
  selectedTab: TabOptions;
  liquidityPairs: LiquidityType[];
}) => {
  const { pools: favoritePools } = useLiquidityStore();

  const selectedList = useMemo(() => {
    if (selectedTab === All) return liquidityPairs;
    if (selectedTab === FAVORITES) return favoritePools;

    // Default is My Pools
    return liquidityPairs;
  }, [selectedTab, favoritePools, liquidityPairs]);
  if (selectedList.length === 0)
    return (
      <div className="flex-col-center">
        <img src={minimetisFace} alt="not-liquidity" />
        <h2>No liquidity found</h2>
      </div>
    );

  return <LiquidityList list={selectedList} />;
};

export default LiquidityDetails;

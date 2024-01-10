import { useMemo } from "react";

import minimetisFace from "assets/images/minimetisFace.png";
import { EXAMPLE_DATA, TabOptions } from "config/trade/constants";
import { useLiquidityStore } from "store/useLiquidityStore";

import LiquidityList from "../LiquidityList";

const { All, FAVORITES } = TabOptions;

const LiquidityDetails = ({ selectedTab }: { selectedTab: TabOptions }) => {
  const { pools: favoritePools } = useLiquidityStore();

  const selectedList = useMemo(() => {
    if (selectedTab === All) return EXAMPLE_DATA;
    if (selectedTab === FAVORITES) return favoritePools;

    // Default is My Pools
    return EXAMPLE_DATA;
  }, [selectedTab, favoritePools]);
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

import PointingImg from "assets/components/PointingImg";
import { type LiquidityType, type SwapToken } from "types/common";

import Header from "./Header";
import PoolInformation from "./PoolInformation";

const PoolDetails = ({
  lp,
  poolSwap,
}: {
  lp: LiquidityType | null;
  poolSwap: SwapToken[];
}) => {
  if (poolSwap.length === 0) return null;
  const [token0, token1] = poolSwap;

  if (!lp) {
    return (
      <div className="pool-wrapper w-full">
        <Header token0={token0.token} token1={token1.token} />

        <div className="new-pool-wrapper w-full">
          <div className="flex-col">
            <h3>You are the first liquidity provider of new pool</h3>
            <p>
              The ratio of tokens you add will set the price. Once you are ok
              with the rate click supply to review.
            </p>
          </div>
          <PointingImg />
        </div>
        <div className="new-pool-disclaimer flex-col" style={{ gap: "10px" }}>
          <h4>Liquidity provider rewards</h4>
          <p>
            Liquidity providers earn a 0.25% fee on all trades proportional to
            their share of the pool. Fees are added to the pool, accrue in real
            time and can be claimed by withdrawing your liquidity.
          </p>
        </div>
      </div>
    );
  }

  const { liquidity, name, totalFees, volume24h, lpRewardApr } = lp;

  const [token1Name, token2Name] = name.split("/");

  return (
    <div className="pool-wrapper w-full">
      {/* HEADER */}
      <Header token0={token0.token} token1={token1.token} lp={lp} />
      {/* INFORMATION */}
      <div className="wrapper-information">
        <h4>Liquidity provider rewards</h4>
        <p>
          Liquidity providers earn a 0.25% fee on all trades proportional to
          their share of the pool. Fees are added to the pool, accrue in real
          time and can be claimed by withdrawing your liquidity.
        </p>
      </div>
      {/* Pools information */}
      <div className="pools-grid">
        <PoolInformation label="Liquidity" amount={liquidity} type="price" />
        <PoolInformation label="Volume (24H)" amount={volume24h} type="price" />
        <PoolInformation
          label="Total Fee (24H)"
          amount={totalFees}
          type="price"
        />
        <PoolInformation
          label="LP Reward APR"
          amount={lpRewardApr}
          type="price"
        />
        <PoolInformation
          label={`${token1Name} per ${token2Name}`}
          amount="66.143"
          type="number"
        />
        <PoolInformation
          label={`${token2Name} per ${token1Name}`}
          amount="0.015"
          type="number"
        />
        <PoolInformation label={token1Name} amount="528038.499" type="number" />
        <PoolInformation label={token2Name} amount="7983.253" type="number" />
      </div>
    </div>
  );
};

export default PoolDetails;

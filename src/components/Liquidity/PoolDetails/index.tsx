import PointingImg from "assets/components/PointingImg";
import usePoolDetails from "hooks/usePoolDetails";
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
  const [token0, token1] = poolSwap;

  const { poolDetails } = usePoolDetails({
    tokenA: token0.token,
    tokenB: token1.token,
  });

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
  const { liquidity, balances, lpReward, prices } = poolDetails;
  const { name, tokens } = lp;

  const [token1Name, token2Name] = name.split("/");
  const pricesAmounts = [prices[tokens[0].address], prices[tokens[1].address]];

  const balancesAmounts = [
    balances[tokens[0].address],
    balances[tokens[1].address],
  ];

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

        <PoolInformation label="LP Reward APR" amount={lpReward} type="price" />
        <PoolInformation
          label={`${token2Name} per ${token1Name}`}
          amount={pricesAmounts[0]}
          type="number"
        />
        <PoolInformation
          label={`${token1Name} per ${token2Name}`}
          amount={pricesAmounts[1]}
          type="number"
        />
        <PoolInformation
          label={token2Name}
          amount={balancesAmounts[0]}
          type="number"
        />
        <PoolInformation
          label={token1Name}
          amount={balancesAmounts[1]}
          type="number"
        />
      </div>
    </div>
  );
};

export default PoolDetails;

import { FaCopy } from "react-icons/fa";

import { type LiquidityType } from "types/common";

import PoolInformation from "./PoolInformation";
import { styles } from "./styles";

const PoolDetails = ({ lp }: { lp: LiquidityType }) => {
  const {
    address,
    liquidity,
    name,
    totalFees,
    volume24h,
    lpRewardApr,
    tokensLogos,
    tokens,
  } = lp;

  const [token1, token2] = name.split("/");

  return (
    <div className="w-full" css={styles()}>
      <div className="wrapper w-full">
        {/* HEADER */}
        <div className="header">
          <div className="tokens">
            <img
              src={tokensLogos[0]}
              alt={tokens[0].symbol}
              style={{ width: "auto", height: 30 }}
            />
            <img
              src={tokensLogos[1]}
              alt={tokens[1].symbol}
              style={{ width: "auto", height: 30, translate: -10 }}
            />
          </div>
          <div>
            <p>{`${name} LP`}</p>
            <div className="text-copy">
              <p>{`Pair Address: ${address.slice(0, 4)}...${address.slice(
                -4
              )}`}</p>
              <FaCopy size="15" />
            </div>
          </div>
        </div>
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
          <PoolInformation
            label="Volume (24H)"
            amount={volume24h}
            type="price"
          />
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
            label={`${token1} per ${token2}`}
            amount="66.143"
            type="number"
          />
          <PoolInformation
            label={`${token2} per ${token1}`}
            amount="0.015"
            type="number"
          />
          <PoolInformation label={token1} amount="528038.499" type="number" />
          <PoolInformation label={token2} amount="7983.253" type="number" />
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;

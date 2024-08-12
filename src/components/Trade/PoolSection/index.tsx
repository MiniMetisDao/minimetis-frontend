import { FaCircle, FaCopy } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import type { LiquidityType } from "utils/types";

import { IconButton } from "components/shared/IconButton";
import { useLiquidityStore } from "store/useLiquidityStore";
import { useTradeNavigation } from "store/useTradeNavigation";

import { CreateLiquidity } from "../CreateLiquidity";

import PoolInformation from "./PoolInformation";
import { styles } from "./styles";

const PoolSection = ({ lp }: { lp: LiquidityType }) => {
  const { address, liquidity, name, totalFees, volume24h, lpRewardApr } = lp;
  const { selectLP } = useLiquidityStore();
  const { setOption } = useTradeNavigation();
  const [token1, token2] = name.split("/");

  const returnBack = () => {
    selectLP(null);
    setOption(null);
  };

  return (
    <div css={styles()}>
      <div>
        <h3 style={{ height: 20 }}></h3>
        <CreateLiquidity lp={lp} />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <IconButton onClick={returnBack}>
            <IoReturnDownBack size="25px" />
          </IconButton>
          <h3 style={{ height: 20 }}>Pools</h3>
        </div>
        <div className="wrapper">
          {/* HEADER */}
          <div className="header">
            <div className="tokens">
              <FaCircle size="30" />
              <FaCircle size="30" color="blue" style={{ right: 0 }} />
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
              their share of the pool. Fees are added to the pool, accrue in
              real time and can be claimed by withdrawing your liquidity.
            </p>
          </div>
          {/* Pools information */}
          <div className="pools-grid">
            <PoolInformation
              label="Liquidity"
              amount={liquidity}
              type="price"
            />
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
    </div>
  );
};

export default PoolSection;

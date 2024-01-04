import { FaCircle, FaCopy } from "react-icons/fa";

import { CreateLiquidity } from "../CreateLiquidity";

import PoolInformation from "./PoolInformation";
import { styles } from "./styles";

const PoolSection = () => {
  return (
    <div css={styles()}>
      <div>
        <h3 style={{ height: 20 }}></h3>
        <CreateLiquidity />
      </div>
      <div style={{ width: "100%" }}>
        <h3 style={{ height: 20 }}>Pools</h3>
        <div className="wrapper">
          {/* HEADER */}
          <div className="header">
            <div className="tokens">
              <FaCircle size="30" />
              <FaCircle size="30" color="blue" style={{ right: 0 }} />
            </div>
            <div>
              <p>NETT - Metis LP</p>
              <div className="text-copy">
                <p>Pair Address: 0x6031...1Cbd</p>
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
              amount="1401,609.599"
              type="price"
            />
            <PoolInformation
              label="Volume (24H)"
              amount="1401,609.599"
              type="price"
            />
            <PoolInformation
              label="Total Fee (24H)"
              amount="1401,609.599"
              type="price"
            />
            <PoolInformation
              label="LP Reward APR"
              amount="1401,609.599"
              type="price"
            />
            <PoolInformation
              label="NETT per Metis"
              amount="66.143"
              type="number"
            />
            <PoolInformation
              label="Metis per NETT"
              amount="0.015"
              type="number"
            />
            <PoolInformation label="NETT" amount="528038.499" type="number" />
            <PoolInformation label="Metis" amount="7983.253" type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolSection;

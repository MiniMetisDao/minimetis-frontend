import { FaCircle } from "react-icons/fa";
import type { LiquidityType } from "utils/types";

import Favorite from "components/shared/Favorite";
import { usePaginationStore } from "store/usePaginationStore";

import Pagination from "../Pagination";

const LiquidityList = ({ list }: { list: LiquidityType[] }) => {
  const { currentPage } = usePaginationStore();
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <table className="table">
        <thead>
          <tr className="no-hover">
            <th>Name</th>
            <th>Liquidity</th>
            <th>Volume(24h)</th>
            <th>LP Reward APR</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="name-row">
                  <div className="name">
                    <div className="tokens">
                      <FaCircle size="30" />
                      <FaCircle size="30" color="blue" style={{ right: 0 }} />
                    </div>
                    <p>{item.name}</p>
                  </div>
                  <Favorite data={item} />
                </div>
              </td>
              <td>${item.liquidity}</td>
              <td>${item.volume24h}</td>
              <td className={item.lpRewardApr >= 0 ? "positive" : "negative"}>
                {item.lpRewardApr}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={10} totalItems={list.length} />
    </>
  );
};

export default LiquidityList;

import { useNavigate } from "@tanstack/react-location";

import usePoolsDetails from "hooks/usePoolsDetails.";
import { useLiquidityStore } from "store/useLiquidityStore";
import { usePaginationStore } from "store/usePaginationStore";
import { type LiquidityType, type SwapToken } from "types/common";

import ListRow from "./ListRow";
import Pagination from "./Pagination";

const LiquidityList = ({ list }: { list: LiquidityType[] }) => {
  const { currentPage } = usePaginationStore();
  const itemsPerPage = 10;
  const { selectLP } = useLiquidityStore();
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = list.slice(startIndex, startIndex + itemsPerPage);
  const { poolsMap } = usePoolsDetails({ list: visibleData });

  const onSelectLP = (newLP: LiquidityType) => {
    const swapTokens: SwapToken[] = [
      {
        amount: "0",
        token: newLP.tokens[0],
        estimated: true,
      },
      {
        amount: "0",
        token: newLP.tokens[1],
        estimated: true,
      },
    ];

    selectLP(newLP, swapTokens);
    navigate({
      to: `add/${newLP.tokens[0].address}/${newLP.tokens[1].address}`,
      replace: true,
      fromCurrent: false,
    });
  };

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
            <ListRow
              key={`${item.address}-${index}`}
              item={item}
              details={poolsMap[item.address]}
              onSelectLP={onSelectLP}
            />
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={10} totalItems={list.length} />
    </>
  );
};

export default LiquidityList;

import { useNavigate } from "@tanstack/react-location";

import Favorite from "components/shared/Favorite";
import { LOGOS } from "config/trade/tradingTokens";
import { useLiquidityStore } from "store/useLiquidityStore";
import { usePaginationStore } from "store/usePaginationStore";
import { type LiquidityType, type SwapToken } from "types/common";

import Pagination from "./Pagination";

const LiquidityList = ({ list }: { list: LiquidityType[] }) => {
  const { currentPage } = usePaginationStore();
  const itemsPerPage = 10;
  const { selectLP } = useLiquidityStore();
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = list.slice(startIndex, startIndex + itemsPerPage);

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
            <tr key={index}>
              <td>
                <div className="name-row">
                  <div className="name" onClick={() => onSelectLP(item)}>
                    <div className="tokens">
                      <img
                        src={LOGOS[item.tokens[0].address]}
                        alt={item.tokens[0].symbol}
                        style={{ width: "auto", height: 30 }}
                      />
                      <img
                        src={LOGOS[item.tokens[1].address]}
                        alt={item.tokens[1].symbol}
                        style={{ width: "auto", height: 30, translate: -10 }}
                      />
                    </div>
                    <p>{item.name}</p>
                  </div>
                  <Favorite data={item} />
                </div>
              </td>
              <td onClick={() => onSelectLP(item)}>${item.liquidity}</td>
              <td onClick={() => onSelectLP(item)}>${item.volume24h}</td>
              <td
                onClick={() => onSelectLP(item)}
                className={
                  Number(item.lpRewardApr) >= 0 ? "positive" : "negative"
                }
              >
                {item.lpRewardApr}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination itemsPerPage={10} totalItems={list.length} /> */}
    </>
  );
};

export default LiquidityList;

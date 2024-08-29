import Favorite from "components/shared/Favorite";
import { LOGOS } from "config/trade/tradingTokens";
import { type LiquidityType, type PoolDetails } from "types/common";

interface Props {
  item: LiquidityType;
  details: PoolDetails;
  onSelectLP: (newLP: LiquidityType) => void;
}

const ListRow = ({ details, item, onSelectLP }: Props) => {
  const { name, tokens } = item;

  return (
    <tr>
      <td>
        <div className="name-row">
          <div className="name" onClick={() => onSelectLP(item)}>
            <div className="tokens">
              <img
                src={LOGOS[tokens[0].address]}
                alt={tokens[0].symbol}
                style={{ width: "auto", height: 30 }}
              />
              <img
                src={LOGOS[tokens[1].address]}
                alt={tokens[1].symbol}
                style={{ width: "auto", height: 30, translate: -10 }}
              />
            </div>
            <p>{name}</p>
          </div>
          <Favorite data={item} />
        </div>
      </td>
      <td
        style={{ display: "flex", justifyContent: "center" }}
        onClick={() => onSelectLP(item)}
      >
        $<p style={{ minWidth: "80px" }}>{details ? details.liquidity : "-"}</p>
      </td>
      <td onClick={() => onSelectLP(item)}>-</td>
      <td
        onClick={() => onSelectLP(item)}
        className={Number(1) >= 0 ? "positive" : "negative"}
      >
        -
      </td>
    </tr>
  );
};

export default ListRow;

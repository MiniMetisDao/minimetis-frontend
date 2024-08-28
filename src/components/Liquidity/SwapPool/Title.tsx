import { type LiquidityType } from "types/common";
import { PoolAction } from "utils/enums";

interface TitleProps {
  lp: LiquidityType | null;
  onAction: (action: PoolAction) => void;
  selected: PoolAction;
}

const ACTIONS = [PoolAction.ADD, PoolAction.REMOVE];

export default function Title({ lp, onAction, selected }: TitleProps) {
  // check if lp exist on data
  if (!lp) return <h2>Create Pair</h2>;

  return (
    <div className="tab-pool">
      {ACTIONS.map((action, index) => (
        <button
          key={index}
          onClick={() => onAction(action as PoolAction)}
          style={{
            color: selected === action ? "white" : "",
          }}
        >
          {action}
        </button>
      ))}
    </div>
  );
}

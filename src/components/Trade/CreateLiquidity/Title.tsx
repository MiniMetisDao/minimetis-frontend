import { type LiquidityType } from "types/common";

interface TitleProps {
  lp: LiquidityType;
  pairs: LiquidityType[];
}

export default function Title({ lp, pairs }: TitleProps) {
  // check if lp exist on data
  const selectedLP = pairs.find((pair) => pair.address === lp.address);
  if (!selectedLP) return <h2>Create Pair</h2>;

  return <div>Add / Remove</div>;
}

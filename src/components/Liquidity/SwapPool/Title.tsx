import { type LiquidityType } from "types/common";

interface TitleProps {
  lp: LiquidityType | null;
}

export default function Title({ lp }: TitleProps) {
  // check if lp exist on data
  if (!lp) return <h2>Create Pair</h2>;

  return <div>Add / Remove</div>;
}

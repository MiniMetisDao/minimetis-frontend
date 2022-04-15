import { TokenStats } from "./TokenStats";
import { UserBalance } from "./UserBalance";
import { UserDividends } from "./UserDividends";

export const Dashboard: React.FC = () => (
  <>
    <UserBalance />
    <UserDividends />
    <TokenStats />
  </>
);

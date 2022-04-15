import { UserBalance } from "./UserBalance";
import { UserDividends } from "./UserDividends";
import { TokenStats } from "./TokenStats";

export const Dashboard: React.FC = () => (
  <>
    <UserBalance />
    <UserDividends />
    <TokenStats />
  </>
);

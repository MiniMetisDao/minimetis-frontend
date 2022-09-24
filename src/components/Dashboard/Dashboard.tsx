import { Container } from "components/Layout/Container";

import { TokenStats } from "./TokenStats";
import { TokenUpgrade } from "./TokenUpgrade";
import { UserBalance } from "./UserBalance";
import { UserDividends } from "./UserDividends";
import { styles } from "./styles";

export const Dashboard: React.FC = () => (
  <div css={styles}>
    <Container topSection>
      <TokenUpgrade />
      <UserBalance />
      <UserDividends />
      <TokenStats />
    </Container>
  </div>
);

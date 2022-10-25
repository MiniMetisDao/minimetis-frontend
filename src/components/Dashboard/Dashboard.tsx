import { Container } from "components/Layout/Container";

import { TokenStats } from "./TokenStats";
import { UserBalance } from "./UserBalance";
import { UserDividends } from "./UserDividends";
import { styles } from "./styles";

export const Dashboard: React.FC = () => (
  <div css={styles}>
    <Container topSection>
      <UserBalance />
      <UserDividends />
      <TokenStats />
    </Container>
  </div>
);

import { styles } from "./styles";
import { ThemeSwitch } from "./ThemeSwitch";

export const Header: React.FunctionComponent = () => (
  <div css={styles}>
    <div>Minimetis Dashboard</div>
    <ThemeSwitch />
  </div>
);

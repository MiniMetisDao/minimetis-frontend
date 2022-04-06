import { css } from "@emotion/react";
import { ConnectWallet } from "components/ConnectWallet";
import { styles } from "./styles";
import { ThemeSwitch } from "./ThemeSwitch";

export const Header: React.FunctionComponent = () => (
  <div css={styles}>
    <div>Minimetis Dashboard</div>

    <div className="rightSection">
      <ConnectWallet
        css={css`
          cursor: pointer;
        `}
      />
      <ThemeSwitch />
    </div>
  </div>
);

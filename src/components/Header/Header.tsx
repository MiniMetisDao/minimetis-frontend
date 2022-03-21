import { useToggleTheme } from "theme";

import { styles } from "./styles";

export const Header: React.FunctionComponent = () => {
  const toggleTheme = useToggleTheme();

  return (
    <div css={styles}>
      <div>Minimetis Dashboard</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

import { Footer } from "components/Footer";
import { Header } from "components/Header";

import { styles } from "./styles";

export const Layout: React.FC = ({ children }) => {
  return (
    <div css={styles}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

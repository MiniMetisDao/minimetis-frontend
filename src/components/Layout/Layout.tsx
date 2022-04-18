import { Footer } from "components/Footer";
import { Header } from "components/Header";

import { styles } from "./styles";

export const Layout: React.FC = ({ children }) => {
  return (
    <div css={styles}>
      <Header />
      <div className="container group main-content">{children}</div>
      <Footer />
    </div>
  );
};

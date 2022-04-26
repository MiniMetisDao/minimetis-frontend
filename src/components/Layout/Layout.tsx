import { Footer } from "components/Footer";
import { Header } from "components/Header";

import { Container } from "./Container";
import { contentStyles, styles } from "./styles";

type LayoutProps = {
  fullWidth?: boolean;
  padded?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({
  fullWidth,
  padded,
  children,
}) => {
  return (
    <div css={styles} className="group">
      <Header />
      <Container fullWidth={fullWidth} padded={padded}>
        <div css={contentStyles}>{children}</div>
      </Container>
      <Footer />
    </div>
  );
};

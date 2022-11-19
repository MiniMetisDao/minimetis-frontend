import { Container } from "./Container";
import { Footer } from "./Footer";
import { Header } from "./Header";
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

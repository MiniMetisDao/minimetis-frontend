import { styles } from "./styles";

type TopInfoBarProps = {
  message: string | React.ReactNode;
  scrolled?: boolean;
};

export const TopInfoBar: React.FC<TopInfoBarProps> = ({
  message,
  scrolled,
}) => {
  return (
    <div className="top-fixed-banner" css={styles({ scrolled })}>
      {message}
    </div>
  );
};

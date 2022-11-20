import { styles } from "./styles";

type TopInfoBarProps = {
  message: string | React.ReactNode;
  scrolled?: boolean;
  hide?: boolean;
};

export const TopInfoBar: React.FC<TopInfoBarProps> = ({
  message,
  scrolled,
  hide,
}) => {
  if (hide) return null;

  return (
    <div className="top-fixed-banner" css={styles({ scrolled })}>
      {message}
    </div>
  );
};

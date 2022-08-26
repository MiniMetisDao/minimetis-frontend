import { styles } from "./styles";

type TopInfoBarProps = {
  message: string | React.ReactNode;
  sticky?: boolean;
};

export const TopInfoBar: React.FC<TopInfoBarProps> = ({ message, sticky }) => {
  return (
    <div className="top-fixed-banner" css={styles({ sticky })}>
      {message}
    </div>
  );
};

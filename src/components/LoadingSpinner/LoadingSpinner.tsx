import { useTranslation } from "react-i18next";
import { styles } from "./styles";

export const LoadingSpinner: React.FC = () => {
  return (
    <div css={styles}>
      <div className="ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

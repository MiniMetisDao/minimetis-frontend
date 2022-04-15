import { useTranslation } from "react-i18next";

import { styles } from "./styles";

type ComingSoonProps = {
  title?: string;
  description?: string;
};

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
}) => {
  const { t } = useTranslation();

  return (
    <div css={styles}>
      <div className="wrapper">
        <h2>{title || t("comingSoon")}</h2>
        <p>{description || t("comingSoonDescription")}</p>
      </div>
    </div>
  );
};

import { useTranslation } from "react-i18next";

import { styles } from "./styles";

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div css={styles}>
      <div className="wrapper">
        <div className="title-wrapper">
          <h3>{t("notFoundSubTitle")}</h3>
          <h2>{t("notFound")}</h2>
        </div>
        <p>{t("notFoundDescription")}</p>
      </div>
    </div>
  );
};

import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { styles } from "./styles";

export const HugsNotRugsBanner: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <section css={styles}>
      <h3>{t("hugsNotRugsBannerTitle")}</h3>
      <p>
        <Trans
          i18nKey="common:hugsNotRugsBannerDescription"
          components={{
            span: <span />,
            a: (
              <a
                className="link"
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSd9IgqWw7xx5_vpm5Y2XGXcJkq5KcJT-MkGYhm8o0wpHmJWMQ/viewform"
              />
            ),
          }}
        />
      </p>
    </section>
  );
};

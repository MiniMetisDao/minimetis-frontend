import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { styles } from "./styles";

export const HugsNotRugs: React.FC = () => {
  const { t } = useTranslation("hugsNotRugs");

  return (
    <div css={styles}>
      <h1>{t("hugsNotRugs")}</h1>
      <Trans
        i18nKey="hugsNotRugs:introduction"
        components={{
          p: <p />,
          a: <a target="_blank" href="http://rugdoc.io/kyc/" />,
        }}
      />

      <h2>{t("howItWorks")}</h2>
      <Trans
        i18nKey="hugsNotRugs:HowItWorksDescription"
        components={{
          ul: <ul />,
          li: <li />,
          a: (
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd9IgqWw7xx5_vpm5Y2XGXcJkq5KcJT-MkGYhm8o0wpHmJWMQ/viewform"
            />
          ),
        }}
      />

      <p>{t("outro")}</p>
    </div>
  );
};

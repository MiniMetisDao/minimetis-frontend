import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { ComingSoon } from "components/ComingSoon";

export const ComingSoonPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("comingSoon")}</title>
        <meta name="description" content={t("comingSoonDescription")} />
      </ReactMetaTags>
      <ComingSoon />
    </Layout>
  );
};

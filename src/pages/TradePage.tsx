import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { ComingSoon } from "components/ComingSoon";
import { Layout } from "components/Layout";

export const TradePage: React.FC = () => {
  const { t } = useTranslation("trade");

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <ComingSoon title={t("title")} description={t("comingSoon")} />
    </Layout>
  );
};

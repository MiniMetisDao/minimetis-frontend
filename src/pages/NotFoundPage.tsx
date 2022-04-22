import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { NotFound } from "components/NotFound";

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("notFound")}</title>
        <meta name="description" content={t("notFoundDescription")} />
      </ReactMetaTags>
      <NotFound />
    </Layout>
  );
};

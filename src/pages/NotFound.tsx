import { Layout } from "components/Layout";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

export const NotFound: React.FC = () => {
  const { t } = useTranslation("dex");
  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <p>Not found page</p>
    </Layout>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { HugsNotRugs } from "components/HugsNotRugs";
import { Layout } from "components/Layout";

export const HugsNotRugsPage: React.FC = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <HugsNotRugs />
    </Layout>
  );
};

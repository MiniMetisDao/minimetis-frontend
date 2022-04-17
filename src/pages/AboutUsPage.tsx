import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { AboutUs } from "components/AboutUs";

export const AboutUsPage: React.FC = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <AboutUs />
    </Layout>
  );
};

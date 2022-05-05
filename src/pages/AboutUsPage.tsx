import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { AboutUs } from "components/AboutUs";
import { Layout } from "components/Layout";

export const AboutUsPage: React.FC = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <Layout fullWidth padded={false}>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <AboutUs />
    </Layout>
  );
};

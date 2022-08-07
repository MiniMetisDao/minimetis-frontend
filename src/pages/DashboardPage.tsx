import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Dashboard } from "components/Dashboard";
import { Layout } from "components/Layout";

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <Layout fullWidth padded={false}>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <Dashboard />
    </Layout>
  );
};

import { Dashboard } from "components/Dashboard";
import { Layout } from "components/Layout";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <Dashboard />
    </Layout>
  );
};

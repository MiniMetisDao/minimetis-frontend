import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { useMinimeConstants } from "queries";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("dashboard");

  // TODO: Added to test the hook.
  const minimeConstantsQuery = useMinimeConstants();

  console.log(minimeConstantsQuery.data);

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      {/* Placeholder for now to push the footer down */}
      <div style={{ height: 600 }} />
    </Layout>
  );
};

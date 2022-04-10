import { UserBalance } from "components/dashboard/UserBalance";
import { UserDividends } from "components/dashboard/UserDividends";
import { Layout } from "components/Layout";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { useMinimeConstants } from "queries";
import { TokenStats } from "components/dashboard/TokenStats";

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
      <UserBalance />
      <UserDividends />
      <TokenStats />
    </Layout>
  );
};

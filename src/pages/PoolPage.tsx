import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { Pools } from "components/Liquidity/Pools";

export const PoolPage: React.FC = () => {
  const { t } = useTranslation("trade");

  return (
    <Layout fullWidth padded={false}>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <Pools />
    </Layout>
  );
};

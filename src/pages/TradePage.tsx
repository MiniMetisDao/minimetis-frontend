import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { Trade } from "components/Trade";

export const TradePage: React.FC = () => {
  const { t } = useTranslation("trade");

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      <Trade />
    </Layout>
  );
};

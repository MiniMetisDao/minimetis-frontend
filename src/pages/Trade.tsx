import { ConnectWallet } from "components/ConnectWallet";
import { Layout } from "components/Layout";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

export const Trade: React.FC = () => {
  const { t } = useTranslation("dex");
  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      Component
      <p>dex</p>
    </Layout>
  );
};

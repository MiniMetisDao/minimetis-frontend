import { ConnectWallet } from "components/ConnectWallet";
import { Layout } from "components/Layout";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("dashboard");
  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </ReactMetaTags>
      Component <ConnectWallet />
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
      <p>DEmo content</p>
    </Layout>
  );
};

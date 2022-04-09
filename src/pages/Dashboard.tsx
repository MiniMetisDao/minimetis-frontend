import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";
import { CONTRACT_ADDRESS } from "config";
import { useMultiCallContract } from "utils";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("dashboard");

  // TODO: Added to test the hook.
  const nameAndSymbolQuery = useMultiCallContract("contract_variables_01", [
    {
      address: CONTRACT_ADDRESS,
      method: "name",
    },
    {
      address: CONTRACT_ADDRESS,
      method: "symbol",
    },
  ]);

  const decimalsQuery = useMultiCallContract("contract_variables_02", [
    {
      address: CONTRACT_ADDRESS,
      method: "decimals",
    },
  ]);

  console.log(nameAndSymbolQuery.data);
  console.log(decimalsQuery.data);

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

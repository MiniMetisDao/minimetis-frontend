import React from "react";
import { useTranslation } from "react-i18next";
import ReactMetaTags from "react-meta-tags";

import { Layout } from "components/Layout";

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ReactMetaTags>
        <title>{t("notFound")}</title>
        <meta name="description" content={t("notFoundDescription")} />
      </ReactMetaTags>
      {/* TODO: this is temp. update with new design */}
      <p style={{ margin: "200px auto 300px", textAlign: "center" }}>
        {t("notFoundDescription")}
      </p>
    </Layout>
  );
};

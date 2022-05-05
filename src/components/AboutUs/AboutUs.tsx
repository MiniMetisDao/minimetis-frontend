import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { styles } from "./styles";

export const AboutUs: React.FC = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <div css={styles}>
      <div>
        <h1>{t("meetMiniMetis")}</h1>
        <Trans
          i18nKey="aboutUs:meetMiniMetisDescription"
          components={{ p: <p /> }}
        />
      </div>
      <div>
        <h2>{t("tokenomics")}</h2>
        <Trans
          i18nKey="aboutUs:tokenomicsDescription"
          components={{ p: <p /> }}
        />
      </div>
      <div>
        <div>{t("transferTax")}</div>
        <div>
          <Trans
            i18nKey="aboutUs:transferTaxDetails"
            components={{ ul: <ul />, li: <li /> }}
          />
        </div>
      </div>
      <div>
        <h2>{t("ourRoadmap")}</h2>
        <p>{t("ourRoadmapDescription")}</p>
      </div>
    </div>
  );
};

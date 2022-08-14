import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { Container } from "components/Layout/Container";
import { MINIMETIS_CONTRACT_ADDRESS } from "config";

import { styles } from "./styles";

export const AboutUs: React.FC = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <div css={styles}>
      <div className="top-banner"></div>
      <Container>
        <h1>{t("meetMiniMetis")}</h1>
        <Trans
          i18nKey="aboutUs:meetMiniMetisDescription"
          components={{ p: <p /> }}
        />
        <h2>{t("tokenomics")}</h2>
        <Trans
          i18nKey="aboutUs:tokenomicsDescription"
          components={{ p: <p /> }}
        />
      </Container>

      <div className="transfer-tax">
        <Container>
          <div className="wrapper">
            <div>
              <p>{t("transferTax")}</p>
              <p className="buy-link-wrapper">
                <a
                  target="_blank"
                  href={`https://tethys.finance/swap?outputCurrency=${MINIMETIS_CONTRACT_ADDRESS}`}
                >
                  {t("buyMinimetis")}
                </a>
                ({t("optimalSlippage", { value: "17.7%" })})
              </p>
            </div>
            <div>
              <Trans
                i18nKey="aboutUs:transferTaxDetails"
                components={{ ul: <ul />, li: <li /> }}
              />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <h2>{t("ourRoadmap")}</h2>
        <p>{t("ourRoadmapDescription")}</p>
      </Container>
    </div>
  );
};

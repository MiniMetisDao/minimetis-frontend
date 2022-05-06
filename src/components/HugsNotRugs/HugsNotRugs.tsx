import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { HugsNotRugsBanner } from "components/HugsNotRugsBanner";
import { Container } from "components/Layout/Container";

import { styles } from "./styles";

export const HugsNotRugs: React.FC = () => {
  const { t } = useTranslation("hugsNotRugs");

  return (
    <div css={styles}>
      <section className="banner">
        <Container padded={false}>
          <div className="banner-item">
            <h3>{t("banner")}</h3>
            <p>{t("bannerDescription")}</p>
          </div>
        </Container>
      </section>
      <Container>
        <h1>{t("hugsNotRugs")}</h1>
        <div className="intro">
          <div className="intro-content">
            <Trans
              i18nKey="hugsNotRugs:introduction"
              components={{
                p: <p />,
                a: <a target="_blank" href="http://rugdoc.io/kyc/" />,
              }}
            />
          </div>
        </div>
        <div className="how-it-works">
          <h2>{t("howItWorks")}</h2>
          <Trans
            i18nKey="hugsNotRugs:HowItWorksDescription"
            components={{
              ol: <ol />,
              li: <li />,
              span: <span />,
              a: (
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd9IgqWw7xx5_vpm5Y2XGXcJkq5KcJT-MkGYhm8o0wpHmJWMQ/viewform"
                />
              ),
            }}
          />
        </div>
      </Container>

      <div className="outro">
        <Container>
          <p>{t("outro")}</p>
        </Container>
      </div>

      <Container>
        <HugsNotRugsBanner />
      </Container>

      <Container>
        <div className="disclaimer">
          <h2>{t("disclaimer")}</h2>
          <div>
            <Trans
              i18nKey="hugsNotRugs:disclaimerDescription"
              components={{
                p: <p />,
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

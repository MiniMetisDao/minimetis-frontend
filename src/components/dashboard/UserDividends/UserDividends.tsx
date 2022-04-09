import { Trans, useTranslation } from "react-i18next";
import { styles } from "./styles";

export const UserDividends: React.FunctionComponent = () => {
  const { t } = useTranslation(["dashboard"]);

  return (
    <div css={styles}>
      <div className="wrapper">
        <div className="dividend">
          <span className="title">
            <Trans
              i18nKey="dashboard:myClaimedDividends"
              values={{ tokenName: "Metis" }}
              components={{ strong: <strong /> }}
            />
          </span>
          <span className="token-value">
            {t("tokenCurrency", { value: 100000000000000 })}
          </span>
          <div className="base-value">
            <span> {t("currency", { value: 100000000000000 })}</span>
            <span className="base-value-symbol">USD</span>
          </div>
        </div>
      </div>
      <div className="dividend">
        <span className="title">
          <Trans
            i18nKey="dashboard:myUnclaimedDividends"
            values={{ tokenName: "Metis" }}
            components={{ strong: <strong /> }}
          />
        </span>
        <span className="token-value">
          {t("tokenCurrency", { value: 100000000000000 })}
        </span>
        <div className="base-value">
          <span> {t("currency", { value: 100000000000000 })}</span>
          <span className="base-value-symbol">USD</span>
        </div>
      </div>
      <div className="claim">
        <button>claim now</button>
      </div>

      <div className="info">
        <p>
          <Trans
            i18nKey="dashboard:dividendInfo"
            values={{ tokenName: "Metis", minimumAmount: "0.1" }}
            components={{ strong: <strong /> }}
          />
        </p>
      </div>
    </div>
  );
};

import { t } from "i18next";
import { useTheme } from "theme";
import { styles } from "./styles";

export const Footer: React.FC = () => {
  const [theme] = useTheme();

  return (
    <div css={styles({ theme })}>
      <div className="social container">
        <ul>
          <li>
            <a className="twitter" href="https://twitter.com/minimetis">
              {t("twitter")}
            </a>
          </li>
          <li>
            <a className="telegram" href="https://t.me/MiniMetis">
              {t("telegram")}
            </a>
          </li>
          <li>
            <a className="discord" href="https://discord.gg/cuBskkFZHC">
              {t("discord")}
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <div className="waves-container">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
          <div className="wave wave-4"></div>
        </div>
        {[...Array(11).keys()].map((i) => (
          <div
            className={`object star star-${i + 1}`}
            style={{ animationDelay: `${Math.random() * 20 + 5}s` }}
            key={i}
          />
        ))}
        <div className="object planet-1" />
        <div className="object planet-2" />
        <div className="object minimetis-planet" />
        <div className="footer">
          <div className="logo" />
          <p>
            Learn More at{" "}
            <a href="https://www.minimetis.com">WWW.MINIMETIS.COM</a>
          </p>
        </div>
      </div>
    </div>
  );
};

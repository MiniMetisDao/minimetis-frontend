import { styles } from "./styles";

export const Footer: React.FunctionComponent = () => {
  return (
    <div css={styles}>
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
      <div className="object minime-planet" />
      <div className="footer">
        <div className="logo" />
        <p>Learn More at WWW.MINIMETIS.COM</p>
      </div>
    </div>
  );
};

import { containerStyles } from "./styles";

type ContainerProps = {
  fullWidth?: boolean;
  padded?: boolean;
  topSection?: boolean;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  fullWidth,
  padded = true,
  topSection = false,
  className,
  children,
}) => {
  return (
    <div
      css={containerStyles({ fullWidth, padded })}
      className={className ?? "group"}
    >
      {topSection && <div className="header-spacer" />}
      {children}
    </div>
  );
};

import { containerStyles } from "./styles";

type ContainerProps = {
  fullWidth?: boolean;
  padded?: boolean;
  topSection?: boolean;
};

export const Container: React.FC<ContainerProps> = ({
  fullWidth,
  padded = true,
  topSection = false,
  children,
}) => {
  return (
    <div css={containerStyles({ fullWidth, padded })} className="group">
      {topSection && <div className="header-spacer" />}
      {children}
    </div>
  );
};

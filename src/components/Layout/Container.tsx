import { containerStyles } from "./styles";

type ContainerProps = {
  fullWidth?: boolean;
  padded?: boolean;
};

export const Container: React.FC<ContainerProps> = ({
  fullWidth,
  padded = true,
  children,
}) => {
  return (
    <div css={containerStyles({ fullWidth, padded })} className="group">
      {children}
    </div>
  );
};

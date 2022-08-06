import { type Theme, css } from "@emotion/react";

const styles = ({ color }: Theme) => css`
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${color.text.primary};
  display: flex;
  font-size: 1.25rem;
`;

type IconButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button {...props} css={styles} onClick={onClick}>
      {children}
    </button>
  );
};

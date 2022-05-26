import { css } from "@emotion/react";

export const styles = css`
  width: 250px;
  padding: 10px;

  .selectName {
    width: 100%;
  }

  .logo {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }
`;

type ListStylesProps = {
  isSelected: boolean;
};

export const listStyle = ({ isSelected }: ListStylesProps) => css`
  display: flex;
  margin: 10px 0;
  ${isSelected && `cursor: pointer;`}

  .details {
    flex: 1;
  }
`;

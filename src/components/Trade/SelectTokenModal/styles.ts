import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;

  .selectName {
    width: 100%;
  }

  .token-logo {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    border-radius: 50%;
  }
  input {
    padding: 10px;
    border: none;
    margin: 0 0 20px;
    border-radius: 4px;
    border: 1px solid ${color.secondary};
    background: ${color.primary};
  }
  .token-list {
    overflow-y: auto;
    padding-right: 20px;
  }
`;

type ListStylesProps = {
  isSelected: boolean;
};

export const listStyle = ({ isSelected }: ListStylesProps) => css`
  display: flex;
  margin: 0 0 20px;
  align-items: center;
  cursor: pointer;
  ${isSelected && `cursor: not-allowed; opacity: 0.7;`}
  &:last-child {
    margin: 0;
  }
  .details {
    flex: 1;
    line-height: 1.2;
  }
  .token-symbol {
    font-size: 0.75rem;
  }
`;

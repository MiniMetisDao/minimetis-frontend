import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  margin-bottom: 100px;

  a {
    color: ${color.text.white};
  }
`;

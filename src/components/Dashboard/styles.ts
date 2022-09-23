import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  background: ${color.alternative};
`;

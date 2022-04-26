import { css } from "@emotion/react";

export const styles = css``;

export const contentStyles = css`
  // TODO: Find a better solution than hardcoding header and footer height
  min-height: calc(100vh - 1072px); // 1072px = header + footer
`;

export const containerStyles = ({
  fullWidth,
  padded,
}: {
  fullWidth?: boolean;
  padded?: boolean;
}) => css`
  ${!fullWidth && ` max-width: 1038px;`}
  ${padded && `padding: 0 20px;`}
  margin: 0 auto;
`;

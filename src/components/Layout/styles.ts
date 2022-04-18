import { css } from "@emotion/react";

export const styles = css`
  .container {
    max-width: 1038px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .main-content {
    // TODO: Find a better solution than hardcoding header and footer height
    min-height: calc(100vh - 1072px); // 1072px = header + footer
  }
`;

import { css, Theme } from "@emotion/react";

// TODO: Put the proper resets here.
export const globalStyles = (theme: Theme) => css`
  html,
  body {
    padding: 0;
    margin: 0;

    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    background: ${theme.color.primary};
    color: ${theme.color.text.primary};
  }
  html {
    position: relative;
    display: flex;
  }
  body {
    flex: 1;
    padding-bottom: 650px; // move it to footer
  }
`;

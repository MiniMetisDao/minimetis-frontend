import { type Theme, css } from "@emotion/react";

export const styles =
  ({ scrolled }: { scrolled?: boolean }) =>
  ({ color }: Theme) =>
    css`
      background: #000000b3;
      color: #fff;
      padding: 10px 20px;
      position: fixed;
      width: 100%;
      left: 0;
      top: ${scrolled ? "117px" : "60px"};
      text-align: center;
      border-bottom: 1px solid ${color.text.primary}cc;
      border-top: 1px solid ${color.text.primary}cc;
      font-size: 16px;
      a {
        color: #fff;
      }
    `;

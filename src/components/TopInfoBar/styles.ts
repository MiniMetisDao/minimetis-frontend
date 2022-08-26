import { type Theme, css } from "@emotion/react";

export const styles =
  ({ sticky }: { sticky?: boolean }) =>
  ({ color }: Theme) =>
    css`
      background: ${color.primary};
      padding: 10px 20px;
      position: fixed;
      width: 100%;
      left: 0;
      top: ${sticky ? "117px" : "60px"};
      text-align: center;
      border-bottom: 1px solid ${color.text.primary};
      border-top: 1px solid ${color.text.primary};
      font-size: 16px;
      a {
        color: ${color.text.primary};
      }
    `;

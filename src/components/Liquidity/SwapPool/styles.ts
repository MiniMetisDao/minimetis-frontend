import { type Theme, css } from "@emotion/react";

import { type Mode } from "theme";

export const styles =
  ({ theme }: { theme: Mode }) =>
  ({ color }: Theme) =>
    css`
      width: 100%;
      .swap-container {
        background: ${color.secondary};
        padding: 20px 20px 50px;
        border-radius: 30px;
        width: 420px;
        position: relative;
        @media (max-width: 1200px) {
          width: 100%;
          margin: 0 auto;
        }
        ::after {
          content: "";
          width: 193px;
          height: 70px;
          position: absolute;
          right: 10px;
          bottom: -25px;
        }
        ::before {
          content: "";
          width: 172px;
          height: 234px;

          position: absolute;
          right: -169px;
          bottom: -30px;
          @media (max-width: 768px) {
            display: none;
          }
        }
      }
      h1 {
        color: ${color.color5};
        font-size: 40px;
        text-align: center;
      }
      h2 {
        margin: 0;
        text-transform: uppercase;
        font-size: 20px;
      }
      .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 30px;
        span {
          display: inline-flex;
          gap: 10px;
        }
      }
      .middle-plus-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 20px;
      }
      @keyframes spin {
        100% {
          transform: rotate(270deg);
        }
      }
      .swap-warning {
        font-size: 16px;
        padding: 8px 5px;
        display: flex;
        min-height: 36px;
        overflow: hidden;
        margin: 0 0 10px;
        color: ${color.text.primary};
        .icon {
          color: ${color.alert.warning};
          font-size: 20px;
          margin-right: 10px;
          display: inline-flex;
        }
      }
      .your-position-wrapper {
        width: 100%;
        padding: 20px 0 0 0;
      }
      .your-position-card {
        width: 100%;
        padding: 14px;
        background: ${color.color13};
        border-radius: 10px;
      }
      .your-position-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      .tokens-logos {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    `;

export const tokenInputStyles =
  ({ from }: { from: boolean }) =>
  ({ color }: Theme) =>
    css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .input-title-wrapper {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
        margin-bottom: 10px;
        padding: 0 12px;
      }
      .input-field-wrapper {
        width: 100%;
        background: ${color.color13};
        border: 1px solid ${color.color14};
        border-radius: 8px;
        font-size: 22px;
        padding: 10px;
        display: flex;
        align-items: center;
        ${!from && `margin-bottom: 20px;`}
      }
      .token-selector-btn {
        align-items: center;
        display: flex;
        border-left: 1px solid ${color.color14};
        font-size: 14px;
        color: ${color.text.primary};
        .icon {
          margin-left: 10px;
          display: flex;
        }
      }
      .max-btn {
        background: ${color.color15};
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
        text-transform: uppercase;
      }
      img {
        width: 24px;
        border-radius: 50%;
        margin-right: 10px;
      }
      button {
        cursor: pointer;
        background: transparent;
        border: none;
      }
      .input-approval-wrapper {
        margin: 0 10px;
        font-size: 14px;
        line-height: 2;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: flex-end;
      }
    `;

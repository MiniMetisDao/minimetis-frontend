import { type Theme, css } from "@emotion/react";

import bushLight from "assets/images/bush-light.png";
import bush from "assets/images/bush.png";
import floatingLandLight from "assets/images/floating-land-light.png";
import floatingLand from "assets/images/floating-land.png";
import minimePointingLight from "assets/images/minime-pointing-light.png";
import minimePointing from "assets/images/minime-pointing.png";
import { type Mode } from "theme";

export const styles =
  ({ theme }: { theme: Mode }) =>
  ({ color }: Theme) =>
    css`
      background: ${color.alternative}
        url(${theme === "light" ? floatingLandLight : floatingLand}) no-repeat
        bottom center;
      min-height: 480px;
      margin: 0 0 40px;
      padding: 20px 0;
      .swap-container {
        background: ${color.secondary};
        padding: 20px 20px 50px;
        border-radius: 30px;
        width: 420px;
        margin: 0 auto 240px;
        position: relative;
        @media (max-width: 640px) {
          width: 100%;
        }
        ::after {
          content: "";
          width: 193px;
          height: 70px;
          background: url(${theme === "light" ? bushLight : bush}) no-repeat
            right top;
          position: absolute;
          right: 10px;
          bottom: -25px;
        }
        ::before {
          content: "";
          width: 172px;
          height: 234px;
          background: url(${theme === "light"
              ? minimePointingLight
              : minimePointing})
            no-repeat right top;
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
      .switch-input-btn {
        cursor: pointer;
        background: transparent;
        border: none;
        color: ${color.text.primary};
        margin: 0 auto;
        display: flex;
        transform: rotate(90deg);
        font-size: 30px;
        &.flip {
          animation: spin 0.2s ease-in;
        }
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
      .trade-info {
        display: flex;
        justify-content: space-between;
        line-height: 1.6;
        gap: 10px;
        span {
          display: flex;
          gap: 5px;
          &:last-child {
            word-break: break-all;
          }
        }
        .info-icon {
          font-size: 24px;
        }
      }
      .swap-btn-wrapper {
        margin: 0 0 20px;
      }
    `;

export const tokenInputStyles =
  ({ from }: { from: boolean }) =>
  ({ color }: Theme) =>
    css`
      .input-title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 0 12px;
      }
      .input-field-wrapper {
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

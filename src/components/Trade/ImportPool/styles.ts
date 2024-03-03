import { type Theme, css } from "@emotion/react";

import bushLight from "assets/images/bush-light.png";
import bush from "assets/images/bush.png";
import minimePointingLight from "assets/images/minime-pointing-light.png";
import minimePointing from "assets/images/minime-pointing.png";
import { type Mode } from "theme";

export const styles =
  ({ theme }: { theme: Mode }) =>
  ({ color }: Theme) =>
    css`
      .swap-container {
        background: #3d2941;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 20px 20px;
        border-radius: 30px;
        width: 420px;
        margin: 0 auto 240px;
        position: relative;
        @media (max-width: 640px) {
          width: 100%;
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
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: inline-flex;
          gap: 10px;
        }
      }
      .information {
        padding: 8px;
        width: 100%;
        text-align: center;
        border: 1px solid #ac7ab6;
        border-radius: 5px;
        color: #ac7ab6;
      }
      .suggestion {
        width: 100%;
        display: flex;
        padding: 10px 30px;
        align-items: center;
        text-align: center;
        background-color: #342436;
        justify-content: center;
        border-radius: 10px;
      }
      @keyframes spin {
        100% {
          transform: rotate(270deg);
        }
      }
    `;

export const tokenInputStyles =
  () =>
  ({ color }: Theme) =>
    css`
      width: 100%;

      .pool-selector-btn {
        align-items: center;
        justify-content: space-between;
        display: flex;
        width: 100%;
        border: 2px solid #ac7ab6;
        border-radius: 5px;
        padding: 8px;
        font-size: 14px;
        color: ${color.text.primary};
        .icon {
          margin-left: 10px;
          display: flex;
        }
      }

      img {
        width: 24px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .pool-name {
        display: flex;
        align-items: center;
        gap: 2px;
      }
      button {
        cursor: pointer;
        background: transparent;
        border: none;
      }
    `;

import { type Theme, css } from "@emotion/react";

import floatingLandLight from "assets/images/floating-land-light.png";
import floatingLand from "assets/images/floating-land.png";
import { type Mode } from "theme";

export const styles =
  ({ theme, showbg }: { theme: Mode; showbg: boolean }) =>
  ({ color }: Theme) =>
    css`
      background-color: ${color.alternative};
      background: ${showbg &&
      `url(${theme === "light" ? floatingLandLight : floatingLand})
        no-repeat bottom center`};
      min-height: 480px;
      margin: 0 0 40px;
      padding: 20px 0;
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
      .tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: center;
        gap: 20px;
        font-size: 24px;
        margin-bottom: 60px;
        cursor: pointer;
      }
      .tabs > a {
        display: flex;
        width: 140px;
        align-items: center;
        gap: 10px;
        text-align: center;
        text-decoration: none;
        border-bottom: 3px solid transparent;
        padding-bottom: 10px;
      }
      .selected-tab {
        color: ${color.color5};
        border-bottom: 3px solid ${color.color5} !important;
      }
    `;

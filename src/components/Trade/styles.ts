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
        gap: 20px;
        font-size: 24px;

        margin-bottom: 60px;
        cursor: pointer;
      }
      .tabs > a {
        width: 120px;
        text-align: center;
        text-decoration: none;
        :focus {
          color: ${color.connectInfo.text};
        }
      }
      .selected-tab {
        color: ${color.color5};
        border-bottom: 3px solid ${color.color5};
      }
    `;

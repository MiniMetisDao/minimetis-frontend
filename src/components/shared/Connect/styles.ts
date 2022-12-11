import { type Theme, css } from "@emotion/react";

import metamask from "assets/images/metamask.svg";
import minimetisCry from "assets/images/minimetis-cry.svg";

export const styles = ({ color }: Theme) => css`
  display: flex;
  margin-left: 10px;

  button {
    position: relative;
    background: ${color.connectButton.primary};
    border: none;
    color: ${color.connectButton.text};
    padding: 8px 16px;
    font-size: 18px;
    font-weight: normal;
    line-height: 1.2;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 45px;
    flex-shrink: 0;
    :hover {
      background: ${color.connectButton.hover};
    }
    ::after {
      content: "";
      background: url(${metamask}) no-repeat;
      width: 51px;
      height: 48px;
      position: absolute;
      right: -45px;
      top: -4px;
    }
  }
  .connection-info {
    background: ${color.connectInfo.primary};
    color: ${color.connectInfo.text};
    flex-shrink: 0;
    font-size: 18px;
    font-weight: normal;
    padding: 8px 16px;
    line-height: 1.2;
    border-radius: 5px;
    margin-right: 10px;

    &.cry {
      position: relative;
      padding-right: 60px;
      ::after {
        content: "";
        background: url(${minimetisCry}) no-repeat;
        width: 48px;
        height: 35px;
        position: absolute;
        background-size: 100%;
        top: 3px;
        right: 3px;
      }
    }
  }

  .mobile-menu-wrapper & {
    flex-direction: column;
    width: 100%;
    > * {
      margin-bottom: 20px;
      text-align: left;
    }
    .connection-info {
      margin-right: 0;
    }
  }
`;

export const detailStyles = () => css`
  font-size: 18px;
`;

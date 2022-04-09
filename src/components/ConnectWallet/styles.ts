import { css, Theme } from "@emotion/react";
import metamask from "assets/images/metamask.svg";
export const styles = ({ color }: Theme) => css`
  display: flex;
  margin-left: 10px;

  @media (max-width: 1024px) {
    display: none;
  }

  button {
    position: relative;
    background: ${color.connectButton.primary};
    border: none;
    color: ${color.connectButton.text};
    padding: 8px 21px;
    font-size: 20px;
    font-weight: normal;
    line-height: 1.2;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 45px;
    flex-shrink: 0;
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
    font-size: 20px;
    font-weight: normal;
    padding: 8px 21px;
    line-height: 1.2;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

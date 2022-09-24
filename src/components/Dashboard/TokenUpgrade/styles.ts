import { type Theme, css } from "@emotion/react";

import tokenUpgradeBg from "assets/images/token-upgrade-bg.jpg";
import tokenUpgradeHover from "assets/images/token-upgrade-hover.png";
import tokenUpgrade from "assets/images/token-upgrade.png";

export const styles = ({ color }: Theme) => css`
  margin-top: 30px;
  .token-upgrade {
    background: url(${tokenUpgradeBg}) no-repeat;
    aspect-ratio: 1000/350;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 980px) {
      background: none;
      display: block;
      aspect-ratio: auto;
      text-align: center;
    }
  }
  button {
    background: url(${tokenUpgrade}) no-repeat;
    width: 368px;
    height: 134px;
    border: none;
    font-size: 0;
    padding: 0;
    cursor: pointer;
    margin-top: 2px;
    @media (max-width: 640px) {
      background-size: 100% 100%;
      width: 100%;
      max-width: 368px;
      aspect-ratio: 368/134;
      height: auto;
    }
    :hover {
      background: url(${tokenUpgradeHover}) no-repeat;
      @media (max-width: 640px) {
        background-size: 100% 100%;
      }
    }
    :disabled,
    [disabled] {
      cursor: not-allowed;

      :hover {
        background: url(${tokenUpgrade}) no-repeat;
        @media (max-width: 640px) {
          background-size: 100% 100%;
        }
      }
    }
  }
  .balance-v2 {
    font-size: 22px;
    @media (max-width: 980px) {
      text-align: center;
    }
  }
  .mobile-text {
    display: none;
    text-align: center;
    @media (max-width: 980px) {
      display: block;
    }
    h2 {
      color: ${color.text.secondary};
      font-size: 40px;
      line-height: 1;
      margin-bottom: 24px;
      text-align: center;
    }
    p {
      font-size: 20px;
      line-height: 1.5;
    }
  }
`;

export const modalStyles = css`
  h4 {
    margin: 0 0 20px;
  }
  ol {
    padding-left: 30px;
  }
  .button-group {
    display: flex;
    gap: 20px;
    margin: 0 20px;
    @media (max-width: 640px) {
      flex-direction: column;
    }
  }
  .steps {
    display: flex;
    margin-top: 20px;
    .step {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;

      span {
        position: relative;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ccc;
        margin-bottom: 6px;
      }

      ::after {
        position: absolute;
        content: "";
        border-bottom: 2px solid #ccc;
        width: 100%;
        top: 20px;
        left: 50%;
        z-index: 3;
      }

      &:last-of-type {
        ::after {
          display: none;
        }
      }

      &.completed {
        span {
          background: #289320;
        }
        ::after {
          border-bottom: 2px solid #289320;
        }
      }
    }
  }
`;

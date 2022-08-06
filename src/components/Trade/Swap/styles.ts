import { type Theme, css } from "@emotion/react";

import floatingLand from "assets/images/floating-land.png";

export const styles = ({ color }: Theme) => css`
  background: ${color.color11} url(${floatingLand}) no-repeat bottom center;
  min-height: 480px;
  margin: 0 0 40px;
  padding: 20px;
  .swap-container {
    background: ${color.color12};
    padding: 20px;
    border-radius: 30px;
    width: 40%;
    margin-left: auto;
  }
  h1 {
    color: ${color.color5};
    font-size: 40px;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .swap-btn {
    font-size: 20px;
    width: 100%;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 8px;
    border: none;
    text-transform: uppercase;
    background: ${color.button.primary};
    color: ${color.text.primary};
    :hover {
      background: ${color.button.hover};
    }
    :disabled,
    [disabled] {
      cursor: not-allowed;
      background: ${color.button.disabled};
    }
  }
  .swap-warning {
    font-size: 16px;
    padding: 10px 5px;
    display: flex;
    height: 46px;
    overflow: hidden;
    margin: 0;
    color: ${color.text.primary};
    .icon {
      color: ${color.alert.warning};
      font-size: 20px;
      margin-right: 10px;
    }
  }
`;

export const tokenInputStyles = ({ color }: Theme) => css`
  .input-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .input-field-wrapper {
    background: ${color.color13};
    border: 1px solid ${color.color14};
    border-radius: 8px;
    font-size: 22px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
    margin: 0 10px;
  }
  button {
    cursor: pointer;
    background: transparent;
    border: none;
  }
`;

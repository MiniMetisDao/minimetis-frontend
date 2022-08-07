import { type Theme, css } from "@emotion/react";

import minimetisSuper from "assets/images/minimetis-super.svg";

export const styles = ({ color }: Theme) => css`
  color: ${color.text.white};
  font-size: 20px;
  margin: 0 0 70px;

  .dividend {
    background: #58008e;
    box-shadow: 0px 4px 4px #00000040;
    border-radius: 8px;
    padding: 30px 60px;
    font-size: 20px;
    line-height: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
    @media (max-width: 1024px) {
      flex-direction: column;
      padding: 20px;

      span {
        margin-bottom: 10px;
      }
    }
  }
  > .dividend {
    background: #4d007c;
    margin-top: -5px;
    padding-top: 35px;
  }
  .wrapper {
    position: relative;
    z-index: 2;

    ::after {
      content: "";
      background: #4e007e4d;
      position: absolute;
      top: 4px;
      height: 100%;
      width: 100%;
      left: 0;
      z-index: 0;
    }
  }
  .token-value {
    font-size: 60px;

    @media (max-width: 1024px) {
      font-size: 45px;
    }
  }
  .base-value {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    line-height: 1;
  }
  .base-value-symbol {
    font-size: 10px;
  }
  .claim {
    text-align: center;
    margin-top: -15px;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
    button {
      cursor: pointer;
      background: ${color.button.primary};
      font-size: 20px;
      color: ${color.button.text};
      border: none;
      text-transform: uppercase;
      padding: 10px 60px;
      border-radius: 0 0 8px 8px;

      :hover {
        box-shadow: 0px 4px 5px ${color.button.shadow.start},
          0px 4px 25px ${color.button.shadow.end};
      }
      :disabled,
      [disabled] {
        cursor: not-allowed;
        background: ${color.button.disabled};
        :hover {
          box-shadow: none;
        }
      }
    }
  }

  .info {
    color: ${color.text.primary};
    position: relative;
    width: 62.5%;
    padding-right: 145px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    min-height: 175px;

    @media (max-width: 1024px) {
      width: 100%;
      padding-right: 0;
      padding-top: 180px;
      text-align: justify;
    }

    ::after {
      content: "";
      background: url(${minimetisSuper}) no-repeat;
      width: 124px;
      height: 176px;
      position: absolute;
      right: 0;
      top: 0;
      @media (max-width: 1024px) {
        right: 50%;
        top: 5px;
        margin-right: -62px;
      }
    }
  }
`;

import { css, Theme } from "@emotion/react";
import minimeSuper from "assets/images/minime-super.png";

export const styles = ({ color }: Theme) => css`
  color: ${color.text.white};
  font-size: 20px;
  margin: 0 0 70px;

  .dividend {
    background: ${color.color7};
    box-shadow: 0px 4px 4px ${color.color7Shadow1};
    border-radius: 8px;
    padding: 30px 60px;
    font-size: 20px;
    line-height: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  > .dividend {
    background: ${color.color1};
    margin-top: -5px;
    padding-top: 35px;
  }
  .wrapper {
    position: relative;
    z-index: 2;

    ::after {
      content: "";
      background: ${color.color7Shadow2};
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
      box-shadow: 0px 4px 5px ${color.button.shadow.start},
        0px 4px 25px ${color.button.shadow.end};

      font-size: 20px;
      color: ${color.text.primary};
      border: none;
      text-transform: uppercase;
      padding: 10px 60px;
      border-radius: 0 0 8px 8px;
    }
  }

  .info {
    position: relative;
    width: 60%;
    padding-right: 145px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    min-height: 175px;
    ::after {
      content: "";
      background: url(${minimeSuper}) no-repeat;
      width: 124px;
      height: 176px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;

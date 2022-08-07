import { type Theme, css } from "@emotion/react";

import minimetisCoin from "assets/images/minimetis-coin.svg";

export const styles = ({ color }: Theme) => css`
  color: ${color.text.black};
  font-size: 20px;
  margin: 0 0 40px;

  h2 {
    color: ${color.text.secondary};
    font-size: 40px;
    line-height: 1;
    margin-bottom: 24px;
    text-align: center;
  }
  .wrapper {
    background: ${color.color5};
    padding: 30px 340px 30px 30px;
    padding-right: 340px;
    box-shadow: 0px 4px 5px ${color.color5Shadow.start},
      0px 4px 25px ${color.color5Shadow.end};
    border-radius: 8px;
    position: relative;

    @media (max-width: 1024px) {
      padding: 30px;
      margin-bottom: 310px;
    }

    ::after {
      content: "";
      background: url(${minimetisCoin}) no-repeat right top;
      width: 337px;
      height: 226px;
      display: block;
      position: absolute;
      right: -26px;
      top: -13px;

      @media (max-width: 1024px) {
        right: 50%;
        top: 100%;
        margin-right: -169px;
        margin-top: 40px;
      }
    }
    > div {
      padding: 12px 0 12px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #01a69b;
      position: relative;
      z-index: 1;
      @media (max-width: 1024px) {
        padding: 12px 0;
      }

      &:first-of-type {
        border-top: none;
      }

      @media (max-width: 1024px) {
        flex-direction: column;
      }
    }
  }
  .title {
    font-weight: 700;
    line-height: 1;
  }
  .percentage-title {
    font-weight: normal;
  }
  .token-value {
    font-size: 40px;
    text-transform: capitalize;
  }
  .percentage-value {
    font-size: 35px;
    justify-content: end;
    flex: 1;
    display: flex;
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
`;

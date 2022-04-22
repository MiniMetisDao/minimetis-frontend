import { css } from "@emotion/react";

import minimetisLost from "assets/images/minimetis-lost.svg";

export const styles = css`
  width: 80%;
  margin: 50px auto 150px;
  @media (max-width: 1024px) {
    width: 100%;
  }

  .wrapper {
    font-size: 20px;
    text-align: center;
  }
  .title-wrapper {
    position: relative;
    padding-bottom: 213px;
    margin-bottom: 50px;
    @media (max-width: 1024px) {
      padding-bottom: 140px;
    }

    ::after {
      content: "";
      background: url(${minimetisLost}) no-repeat;
      width: 311px;
      height: 313px;
      display: block;
      margin-top: -100px;
      margin-left: -128px;
      position: absolute;
      left: 50%;
      z-index: 1;
      @media (max-width: 1024px) {
        width: 200px;
        height: 203px;
        background-size: 100%;
        margin-left: -79px;
        margin-top: -65px;
      }
    }
  }
  h2 {
    font-size: 260px;
    line-height: 1;
    margin: 0;
    @media (max-width: 1024px) {
      font-size: 170px;
    }
  }
  h3 {
    font-size: 58px;
    line-height: 1;
    margin: 0;
    font-weight: normal;
    @media (max-width: 1024px) {
      font-size: 32px;
    }
  }
`;

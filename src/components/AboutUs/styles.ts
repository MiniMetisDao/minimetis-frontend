import { css } from "@emotion/react";

import topBg from "assets/images/about-us-top-bg.jpg";
import minimetisStone from "assets/images/minimetis-stone.svg";

export const styles = css`
  font-size: 20px;
  line-height: 1.6;

  .top-banner {
    background: url(${topBg}) no-repeat;
    aspect-ratio: 1920/890;
    background-size: cover;
    aspect-ratio: 1920/890;
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;

    ::after {
      content: "";
      background: url(${minimetisStone}) no-repeat center;
      aspect-ratio: 370/507;
      display: inline-block;
      max-height: 507px;
      width: 60%;
      margin-bottom: -55px;

      @media (max-width: 1024px) {
        max-height: 80vh;
        margin: 40px 20px -30px;
        background-size: 100%;
      }
    }
  }

  h1,
  h2 {
    font-size: 40px;
    line-height: 1;
    margin: 60px 0 10px;
  }
  p {
    margin: 0 0 30px;
  }

  .transfer-tax {
    background: #04d8cc;
    margin: 50px 0 40px;
    padding: 80px 0;
    color: #443247;
    font-size: 30px;
    line-height: 1.4;
    font-weight: 700;

    .wrapper {
      border-top: 4px solid #443247;
      padding-top: 15px;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      @media (max-width: 640px) {
        grid-auto-flow: row;
      }
    }

    p {
      margin-right: 50px;
      @media (max-width: 640px) {
        margin-right: 0;
      }
    }

    ul {
      list-style: none;
      margin: 0;
      @media (max-width: 640px) {
        padding: 0;
      }
    }
  }
  .banner {
    margin-top: 60px;
  }
`;

import { type Theme, css } from "@emotion/react";

import bannerBg from "assets/images/banner/hugs-not-rugs-join-bg.jpg";
import bannerTitle from "assets/images/banner/hugs-not-rugs-title.png";

export const styles = ({ color }: Theme) => css`
  background: #ff9994 url(${bannerBg}) no-repeat;
  background-size: cover;
  aspect-ratio: 4/1;
  color: ${color.text.white};
  margin: 0 0 80px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h3 {
    background: url(${bannerTitle}) no-repeat;
    background-size: 100%;
    width: 400px;
    height: 135px;
    line-height: 0;
    font-size: 0;
    color: transparent;
    margin-left: 30px;
    margin-top: 10px;
    @media (max-width: 640px) {
      width: 240px;
      height: 90px;
      margin: 0 auto;
    }
  }
  p {
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 40px;

    @media (max-width: 640px) {
      text-align: center;
    }

    span {
      margin-right: 25px;
      @media (max-width: 1024px) {
        margin-right: 0;
      }
    }
  }
  a {
    color: #fff;
    padding: 2px 40px;
    border: 3px solid #fff;
    border-radius: 50px;
    text-decoration: none;
    transition: background 0.4s;
    :hover {
      background: #fff;
      color: #fc9994;
    }
    @media (max-width: 1024px) {
      white-space: nowrap;
      display: inline-block;
      margin-top: 10px;
    }
  }
`;

import { type Theme, css } from "@emotion/react";

import bannerBg from "assets/images/banner/hugs-not-rugs-page-bg.jpg";
import bannerTitle from "assets/images/banner/hugs-not-rugs-title.png";
import minimetisRugdoc from "assets/images/banner/minimetis-rugdoc.png";
import hugOutroBg from "assets/images/hug-outro-bg.png";
import hugSeal from "assets/images/hug-seal.png";
import minimetisThumbsUp from "assets/images/minimetis-thumbs-up.svg";

export const styles = ({ color }: Theme) => css`
  h1 {
    margin: 0 0 40px;
    font-size: 70px;

    @media (max-width: 1024px) {
      font-size: 50px;
    }
  }
  .intro {
    flex-direction: row;
    display: flex;
    margin: 0 0 30px;
    @media (max-width: 1024px) {
      flex-direction: column;
    }

    ::before {
      content: "";
      background: url(${minimetisThumbsUp}) no-repeat;
      width: 503px;
      height: 592px;
      margin-right: 50px;
      @media (max-width: 1024px) {
        background-size: 100%;
        width: 300px;
        height: 350px;
        margin: 0 auto;
      }
    }
    .intro-content {
      flex: 1;

      p {
        font-size: 18px;
        line-height: 1.2;
        margin: 0 0 45px;
        :first-of-type {
          margin-top: 20px;
        }
      }
      p:nth-of-type(2) {
        font-size: 30px;
        font-weight: 700;
      }
    }
  }
  .how-it-works,
  .disclaimer {
    display: flex;
    margin: 0 0 30px;
    font-size: 18px;
    line-height: 1.5;

    h2 {
      margin: 20px 50px 0 0;
      font-size: 70px;
      line-height: 0.85;

      @media (max-width: 1024px) {
        margin: 20px 0;
        font-size: 50px;
      }
    }
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  ol {
    list-style: none;
    margin: 0 0 0 27px;
    padding: 25px 0 50px;
    border-left: 2px solid ${color.text.primary}5c;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    line-height: 1.5;
  }
  li {
    align-items: center;
    display: flex;
    min-height: 56px;
    margin-left: 27px;
    position: relative;
    padding-left: 24px;
    margin-bottom: 17px;
    margin-top: 17px;
    :first-of-type {
      font-weight: 700;
      font-size: 28px;
    }
    ::before {
      background: #29d4c8;
      font-size: 28px;
      font-weight: 700;
      position: absolute;
      left: -56px;
      top: 0;
      width: 56px;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ${Array.from(
      Array(10),
      (_, i) => `:nth-of-type(${i + 1}) {
        
      ::before {
        content: "${i + 1}";
      }
    }`
    )}
  }

  .outro {
    background: #2ad8cc url(${hugOutroBg}) bottom left no-repeat;
    background-size: 100%;
    font-size: 35px;
    font-weight: 700;
    line-height: 1.5;
    color: #443247;
    padding: 80px 0 240px;
    position: relative;
    margin-bottom: 160px;

    @media (max-width: 1024px) {
      padding: 80px 0 140px;
      margin-bottom: 100px;
      background-size: auto;
    }

    ::after {
      content: "";
      background: url(${hugSeal}) no-repeat center bottom;
      width: 100%;
      height: 333px;
      position: absolute;
      bottom: -105px;

      @media (max-width: 1024px) {
        background-size: 300px 130px;
        bottom: -42px;
        width: 100%;
        height: 130px;
      }
    }
  }

  a {
    color: ${color.text.primary};
    text-decoration: underline;
  }

  .banner {
    background: #321f46 url(${bannerBg}) no-repeat;
    background-size: cover;
    color: #fff;
    margin: 0 0 80px;
    h3 {
      background: url(${bannerTitle}) no-repeat;
      background-size: 100%;
      width: 350px;
      height: 115px;
      line-height: 0;
      font-size: 0;
      color: transparent;
      margin-left: 20px;
      @media (max-width: 1024px) {
        margin: 0 auto;
        max-width: 320px;
      }
    }
  }
  .banner-item {
    padding: 40px 0;
    position: relative;
    @media (max-width: 1024px) {
      padding: 40px 20px;
    }

    :before {
      content: "";
      background: url(${minimetisRugdoc}) no-repeat;
      background-size: 100%;
      width: 60%;
      height: 75%;
      position: absolute;
      right: 0;
      bottom: 30px;
      @media (max-width: 1024px) {
        position: static;
        width: 100%;
        max-width: 410px;
        height: 180px;
        display: block;
        margin: 0 auto;
      }
    }

    p {
      width: 36%;
      padding: 20px 50px;
      font-size: 24px;
      @media (max-width: 1024px) {
        margin: 0 auto;
        width: 100%;
        max-width: 400px;
        padding: 20px 0;
      }
    }
  }
`;

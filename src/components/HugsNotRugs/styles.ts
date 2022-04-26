import { type Theme, css } from "@emotion/react";

import hugOutroBg from "assets/images/hug-outro-bg.png";
import hugSeal from "assets/images/hug-seal.png";
import bannerBg from "assets/images/hugs-not-rugs-banner-bg.jpg";
import bannerTitle from "assets/images/hugs-not-rugs-banner-title.png";
import minimetisThumbsUp from "assets/images/minimetis-thumbs-up.svg";

export const styles = ({ color }: Theme) => css`
  margin-bottom: 100px;
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
        :first-child {
          margin-top: 20px;
        }
      }
      p:nth-child(2) {
        font-size: 32px;
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
    border-left: 2px solid ${color.text.primary};
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
    :first-child {
      font-weight: 700;
      font-size: 28px;
    }
    ::before {
      background: ${color.color8};
      font-size: 28px;
      font-weight: 700;
      position: absolute;
      left: -56px;
      top: 0;
    }

    ${Array.from(
      Array(10),
      (_, x) => `:nth-child(${x + 1}) {
        
      ::before {
        content: "${x + 1}";
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }`
    )}
  }

  .outro {
    background: ${color.color8} url(${hugOutroBg}) bottom center no-repeat;
    font-size: 35px;
    font-weight: 700;
    line-height: 1.5;
    color: ${color.text.alternative};
    padding: 80px 0 240px;
    position: relative;
    margin-bottom: 200px;

    @media (max-width: 1024px) {
      padding: 80px 0 140px;
      margin-bottom: 100px;
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
    background: #321f46;
    color: ${color.text.white};
    margin: 0 0 80px;
    @media (max-width: 1024px) {
      display: none;
    }
    h3 {
      background: url(${bannerTitle}) no-repeat;
      background-size: 100%;
      width: 350px;
      height: 115px;
      line-height: 0;
      font-size: 0;
      color: transparent;
      margin-left: 20px;
    }
  }
  .banner-item {
    background: url(${bannerBg}) no-repeat;
    height: 338px;
    background-size: 100%;
    padding: 30px 0;

    p {
      width: 40%;
      padding: 20px 50px;
      font-size: 24px;
    }
  }
`;

import { type Theme, css } from "@emotion/react";

import discordIcon from "assets/images/discord-icon.svg";
import logoFooter from "assets/images/logo-footer.svg";
import minimetisPlanet from "assets/images/minimetis-planet.svg";
import planet1 from "assets/images/planet-1.svg";
import planet2 from "assets/images/planet-2.svg";
import socialBgDark from "assets/images/social-bg-dark.svg";
import socialBgLight from "assets/images/social-bg-light.svg";
import star from "assets/images/star.svg";
import telegramIcon from "assets/images/telegram-icon.svg";
import twitterIcon from "assets/images/twitter-icon.svg";

export const styles =
  ({ theme }: { theme: string }) =>
  ({ color }: Theme) =>
    css`
      .footer-section {
        width: 100%;
        height: 650px;
        position: absolute;
        left: 0;
        bottom: 0;
        overflow: hidden;
      }
      .waves-container {
        position: absolute;
        width: 4200px;
        height: 650px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .wave {
        width: 4200px;
        height: 4200px;
        position: absolute;
        left: 0%;
        border-radius: 49.2%;
        animation: wave 25s infinite reverse linear;
      }
      .wave-1 {
        top: 30px;
        background: #8b57db;
      }
      .wave-2 {
        top: 80px;
        background: #54239f;
      }
      .wave-3 {
        top: 120px;
        background: #351369;
      }
      .wave-4 {
        top: 330px;
        background: #1d0a3a;
      }
      @keyframes wave {
        from {
          transform: rotate(0deg);
          transform-origin: center;
        }
        from {
          transform: rotate(360deg);
          transform-origin: center;
        }
      }

      .object {
        position: absolute;
      }
      .planet-1 {
        background: url(${planet1}) no-repeat;
        width: 132px;
        height: 133px;
        left: 10%;
        top: 280px;

        @media (max-width: 1024px) {
          display: none;
        }
      }
      .planet-2 {
        background: url(${planet2}) no-repeat;
        width: 85px;
        height: 85px;
        right: 20%;
        top: 100px;
      }

      .star {
        background: url(${star}) no-repeat;
        width: 23px;
        height: 24px;
        animation: blink 25s ease-in-out infinite both;
      }

      @keyframes blink {
        0% {
          transform: scale(1);
        }
        .5% {
          transform: scale(0.1);
        }
        1% {
          transform: scale(1);
        }
        100% {
          transform: scale(1);
        }
      }

      .star-1 {
        top: 120px;
        right: 12%;
      }
      .star-2 {
        left: 60%;
        top: 150px;
      }
      .star-3 {
        right: 35%;
        top: 370px;
      }
      .star-4 {
        right: 26%;
        top: 540px;
      }
      .star-5 {
        right: 14%;
        top: 450px;
      }
      .star-6 {
        left: 24%;
        top: 600px;
      }
      .star-7 {
        left: 13%;
        top: 540px;
      }
      .star-8 {
        left: 26%;
        top: 370px;
      }
      .star-9 {
        left: 34%;
        top: 260px;
      }
      .star-10 {
        left: 5%;
        top: 175px;
      }
      .star-11 {
        left: 2%;
        top: 345px;
      }

      .minimetis-planet {
        background: url(${minimetisPlanet}) no-repeat;
        width: 196px;
        height: 280px;
        left: 50%;
        margin-left: -100px;
        top: 150px;
        animation: float 15s infinite ease-in both;
      }

      @keyframes float {
        0% {
          transform: translate(0);
        }
        20% {
          transform: translate(-10px, 10px);
        }
        40% {
          transform: translate(-10px, -10px);
        }
        60% {
          transform: translate(10px, 10px);
        }
        80% {
          transform: translate(10px, -10px);
        }
        100% {
          transform: translate(0);
        }
      }

      .footer {
        color: ${color.text.white};
        position: relative;
        text-align: center;
        margin-top: 480px;
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        .logo {
          display: inline-block;
          background: url(${logoFooter}) no-repeat;
          width: 316px;
          height: 107px;
        }
        a {
          color: ${color.text.white};
          text-decoration: none;
          :hover {
            border-bottom: 1px dashed ${color.text.white};
          }
        }
      }

      .social {
        display: flex;
        width: 78%;
        margin-bottom: 100px;
        justify-content: center;

        @media (max-width: 1024px) {
          width: 100%;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          max-width: 85%;
          @media (max-width: 1024px) {
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 100%;
          }
        }
        li {
          background: url(${theme === "dark" ? socialBgDark : socialBgLight})
            no-repeat;
          background-size: cover;
          min-width: 241px;
          min-height: 82px;
          aspect-ratio: 241/82;
          padding: 10px 18px;
          margin: 0 10px;
          width: 33%;
          display: flex;

          @media (max-width: 1024px) {
            margin-bottom: 20px;
          }
          :hover {
            background-position: 0 100%;
          }
        }
        a {
          color: ${color.text.white};
          text-decoration: none;
          min-height: 40px;
          display: block;
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
        .twitter {
          background: url(${twitterIcon}) no-repeat left center;
          padding-left: 60px;
        }
        .telegram {
          background: url(${telegramIcon}) no-repeat left center;
          padding-left: 65px;
        }
        .discord {
          background: url(${discordIcon}) no-repeat left center;
          padding-left: 70px;
        }
      }
    `;

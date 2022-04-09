import { css } from "@emotion/react";

import minimePlanet from "assets/images/minime-planet.svg";
import planet1 from "assets/images/planet-1.svg";
import planet2 from "assets/images/planet-2.svg";
import star from "assets/images/star.svg";
import logoFooter from "assets/images/logo-footer.svg";

export const styles = css`
  width: 100%;
  height: 650px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;

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

  .minime-planet {
    background: url(${minimePlanet}) no-repeat;
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
    position: relative;
    text-align: center;
    margin-top: 480px;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    .logo {
      display: inline-block;
      background: url(${logoFooter}) no-repeat;
      width: 285px;
      height: 83px;
    }
  }
`;

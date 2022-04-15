// spinner style from https://loading.io/css/
import { css } from "@emotion/react";

export const styles = css`
  text-align: center;
  .ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #00dacc; // hardcoded deliberately since used outside theme provider
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .ellipsis div:nth-of-type(1) {
    left: 8px;
    animation: ellipsis1 0.6s infinite;
  }
  .ellipsis div:nth-of-type(2) {
    left: 8px;
    animation: ellipsis2 0.6s infinite;
  }
  .ellipsis div:nth-of-type(3) {
    left: 32px;
    animation: ellipsis2 0.6s infinite;
  }
  .ellipsis div:nth-of-type(4) {
    left: 56px;
    animation: ellipsis3 0.6s infinite;
  }
  @keyframes ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
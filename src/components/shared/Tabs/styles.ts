import { css } from "@emotion/react";

export const styles = () =>
  css`
    .tabs-container {
      position: relative;
      width: 100%;
    }

    .tabs-list {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    .tab-button {
      cursor: pointer;

      width: 180px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      background-color: transparent;
      border: 1px solid white;
      color: white;
      border-radius: 6px;
      padding: 8px;
      @media (max-width: 1024px) {
        width: 120px;
        font-size: 12px;
      }
      &:hover {
        color: white;
      }
    }
    .tab-button > p {
      margin: 0;
    }
    .tab-button > img {
      object-fit: contain;
      @media (max-width: 1024px) {
        width: 28px;
        height: auto;
      }
    }

    .active-tab {
      background-color: #04d8cc;
    }

    .underline {
      position: absolute;
      bottom: 0;
      height: 0.5rem;
      border-radius: 0.25rem;
      background-color: white;
      transition: all 0.3s;
    }
  `;

import { type Theme, css } from "@emotion/react";

export const styles =
  () =>
  ({ color }: Theme) =>
    css`
      display: flex;
      width: 100%;
      gap: 20px;
      @media (max-width: 1200px) {
        flex-direction: column;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        background: ${color.secondary};
        border-radius: 10px;
        padding: 20px;
        width: 100%;
        gap: 20px;
      }
      .header {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;
      }
      .text-copy {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 700;
      }
      .text-copy > svg {
        cursor: pointer;
      }
      .tokens {
        position: relative;
        width: 45px;
        height: 40px;
        display: flex;
        align-items: center;
      }
      .tokens > svg {
        position: absolute;
      }
      p {
        margin: 0;
      }
      .wrapper-information {
        padding: 8px;
        border-radius: 10px;
        background: ${color.color12};
      }
      .pool-inf-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 10px;
      }
      .pool-inf-wrapper > h4 {
        margin: 0;
        color: #ac7ab6;
      }
      .pools-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        @media (max-width: 1200px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;

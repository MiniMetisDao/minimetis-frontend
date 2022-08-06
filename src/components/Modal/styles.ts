import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  .rodal {
    .rodal-dialog {
      border-radius: 6px;
      background: ${color.modal.primary};
      color: ${color.modal.text};
      max-height: 600px;
      min-height: 300px;
      max-width: 90%;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    .rodal-close {
      top: 24px;
      &:before,
      &:after {
        background: ${color.modal.text};
      }
    }

    h2 {
      font-size: 24px;
      font-weight: normal;
      border-bottom: 1px solid ${color.modal.text}66;
      padding: 20px;
      margin: 0;
      line-height: 1;
    }
    .content {
      overflow: hidden;
      height: 100%;
      padding: 20px;
    }
  }
`;

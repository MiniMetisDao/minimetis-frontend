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
    }
    .rodal-close:before,
    .rodal-close:after {
      background: ${color.modal.text};
    }
    .content {
      overflow: hidden;
      height: 100%;
      padding: 0 10px;

      h2 {
        font-size: 24px;
        font-weight: normal;
        margin: 0 0 30px;
      }
    }
  }
`;

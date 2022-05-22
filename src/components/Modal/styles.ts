import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  .rodal {
    .rodal-dialog {
      border-radius: 6px;
      background: ${color.modal.primary};
      color: ${color.modal.text};
    }
  }
`;

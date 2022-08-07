import { type Theme, css } from "@emotion/react";

export const styles =
  ({ hasError }: { hasError?: boolean }) =>
  ({ color }: Theme) =>
    css`
      font-size: 22px;
      color: ${color.text.primary};
      width: 0;
      flex: 1 1 auto;
      display: inline-flex;
      input {
        background: transparent;
        color: ${hasError ? color.alert.error : color.text.primary};
        font-size: 22px;
        border: none;
        width: 0;
        flex: 1;
        :focus {
          outline: none;
        }
        ::placeholder {
          color: ${color.text.primary};
          opacity: 0.5;
        }
      }
      .suffix {
        opacity: 0.7;
        padding: 4px;
        font-size: 20px;
      }
    `;

export const inputCompactStyles = ({ color }: Theme) =>
  css`
    width: 75px;
    border: 2px solid ${color.color16};
    border-radius: 8px;
    align-items: center;
    input {
      flex: 1 1 auto;
      padding: 5px;
    }
  `;

export const inputButtonStyles =
  ({ active }: { active?: boolean }) =>
  ({ color }: Theme) =>
    css`
      border-radius: 8px;
      min-width: 66px;
      flex-grow: 0;
      padding: 5px;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      border: 2px solid ${active ? color.color16 : `${color.text.primary}4b`};
      background: ${active
        ? `${color.color16}80`
        : `${color.text.primary}4b`}; ;
    `;

import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) =>
  css`
    position: relative;
    background: ${color.actionButton.primary};
    font-size: 22px;
    text-transform: uppercase;
    border: none;
    text-rendering: optimizeLegibility;
    display: inline-block;
    border-radius: 0.3em;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1),
      inset 0 -0.25em 0 rgba(0, 0, 0, 0.25), 0 0.25em 0.25em rgba(0, 0, 0, 0.05);
    color: #fff;
    cursor: pointer;
    font-weight: 700;
    line-height: 1.5;
    padding: 0.25em 1.5em 0.5em;
    position: relative;
    vertical-align: middle;
    user-select: none;
    width: 100%;

    :hover {
      background: ${color.actionButton.hover};
    }
    :disabled,
    .disabled {
      background: ${color.actionButton.disabled};
      cursor: not-allowed;
    }
    :not(:disabled):active {
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.1),
        inset 0 0.25em 0.5em rgba(0, 0, 0, 0.05);
      margin-top: 0.25em;
      padding-bottom: 0.25em;
    }
    :active,
    :focus {
      outline: none;
    }
  `;

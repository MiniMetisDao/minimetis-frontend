import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  background: ${color.tooltip.primary};
  color: ${color.tooltip.text};
  padding: 8px 16px;
  border-radius: 4px;
  //   display: none;

  &[data-show] {
    display: block;
  }
  .arrow,
  .arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }
  .arrow {
    visibility: hidden;
  }
  .arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
  &[data-popper-placement^="top"] > .arrow {
    bottom: -4px;
  }
  &[data-popper-placement^="bottom"] > .arrow {
    top: -4px;
  }
  &[data-popper-placement^="left"] > .arrow {
    right: -4px;
  }
  &[data-popper-placement^="right"] > .arrow {
    left: -4px;
  }
`;

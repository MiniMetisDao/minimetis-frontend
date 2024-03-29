import { css } from "@emotion/react";

export const styles = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  .settings-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px;
    &:last-child {
      margin: 0;
    }

    h4 {
      margin: 0;
      font-size: 20px;
      font-weight: normal;
    }
  }
  .field-wrapper {
    > * {
      margin-left: 10px;
    }
  }
`;

export const compactInputStyles = css`
  width: 90px;
`;

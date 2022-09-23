import { css } from "@emotion/react";

export const styles = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  .field-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px;
    gap: 10px;
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

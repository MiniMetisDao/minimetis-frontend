import { css, Theme } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  color: ${color.text.primary};
  font-size: 20px;
  lin-height: 1.2;
  margin: 0 0 160px;

  .title,
  h4,
  h2 {
    color: ${color.text.secondary};
    margin: 0 0 10px;
  }
  h2 {
    text-align: center;
  }
  .wrapper {
    display: flex;
    padding: 30px 40px;
    border-top: 5px solid ${color.text.secondary};
    border-bottom: 5px solid ${color.text.secondary};
  }

  .stat-group {
    margin: 0 5px;
    flex: 1;
    text-align: center;
    justify-content: space-between;
    display: flex;
    flex-direction: column;

    &:first-of-type {
      text-align: left;
    }
    &:last-of-type {
      text-align: right;
    }
  }
  .stat {
    margin: 0 0 20px;
    :last-of-type {
      margin: 0;
    }

    span {
      display: block;
      &.base-value {
        font-size: 15px;
      }
      &.total-value {
        margin-top: 25px;
      }
    }
  }
`;

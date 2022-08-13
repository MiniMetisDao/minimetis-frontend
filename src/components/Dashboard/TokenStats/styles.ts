import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  color: ${color.text.primary};
  font-size: 20px;
  line-height: 1.2;
  margin: 0 0 100px;

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
    flex-wrap: wrap;
    padding: 30px 40px;
    border-top: 5px solid ${color.text.secondary};
    border-bottom: 5px solid ${color.text.secondary};
    @media (max-width: 1024px) {
      flex-direction: column;
    }
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

    @media (max-width: 1024px) {
      &:first-of-type,
      &:last-of-type {
        text-align: center;
      }
    }
  }
  .stat {
    margin: 0 0 20px;
    :last-of-type {
      margin: 0;
    }
    @media (max-width: 1024px) {
      :last-of-type {
        margin: 0 0 20px;
      }
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

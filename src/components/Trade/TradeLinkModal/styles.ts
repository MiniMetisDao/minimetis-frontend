import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
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
    img {
      width: 24px;
      border-radius: 50%;
    }
    textarea {
      width: 100%;
      resize: none;
      height: 75px;
      font-size: 16px;
      line-height: 1.6;
      padding: 10px;
      border-radius: 4px;
      color: ${color.text.primary};
      background: ${color.text.alternative};
      padding-right: 35px;
    }
  }
  .field-wrapper {
    > * {
      margin-left: 10px;
    }
  }
  .token-selector-btn {
    cursor: pointer;
    background: transparent;
    border: none;
    align-items: center;
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: ${color.text.primary};
    .icon {
      margin-left: 10px;
      display: flex;
    }
  }
  .compact-field {
    width: 120px;
    display: flex;
  }
  .copy-link {
    position: relative;
    flex-direction: column;
    .copy-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 24px;
      cursor: pointer;
    }
    .copy-info {
      display: flex;
      flex: 1;
      color: #159115;
      animation: hide 0.5s ease-in 4s;
      animation-fill-mode: forwards;
      opacity: 1;
      gap: 5px;
      align-items: center;
    }

    @keyframes hide {
      to {
        visibility: hidden;
        opacity: 0;
      }
    }
  }
`;

import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  margin-bottom: 100px;

  .download-btn-wrapper {
    display: flex;
    justify-content: flex-end;

    a {
      color: ${color.text.white};
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 20px;
      display: inline-block;
      text-decoration: none;
      font-size: 20px;
      background: ${color.button.primary};
      :hover {
        box-shadow: 0px 4px 5px ${color.button.shadow.start},
          0px 4px 25px ${color.button.shadow.end};
      }
    }
  }
`;

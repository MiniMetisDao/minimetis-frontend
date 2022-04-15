import { css, Theme } from "@emotion/react";
import minimetisComingSoon from "assets/images/minimetis-coming-soon.png";

export const styles = css`
  display: flex;
  width: 80%;
  margin: 50px auto 150px;

  .wrapper {
    font-size: 20px;
    flex: 1;
    ::after {
      content: "";
      background: url(${minimetisComingSoon}) no-repeat;
      width: 348px;
      height: 252px;
      display: block;
      margin: 0 auto;
      @media (max-width: 1024px) {
        width: 300px;
        background-size: 100%;
      }
    }
  }
  h2 {
    font-size: 40px;
    margin: 0 0 30px;
  }
`;

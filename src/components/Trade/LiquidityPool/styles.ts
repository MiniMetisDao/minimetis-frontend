import { type Theme, css } from "@emotion/react";

export const styles = ({ color }: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  h2 {
    color: ${color.text.secondary};
    font-size: 40px;
    line-height: 1;
    margin: 0;
    text-align: center;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 500px;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }
  .pool-item {
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 0 0 20px;
  }
  .btn {
    background: transparent;
    color: ${color.button.primary};
    border: 2px solid ${color.button.primary};
    :hover {
      opacity: 0.8;
      box-shadow: 0px 4px 5px ${color.button.shadow.start},
        0px 4px 25px ${color.button.shadow.end};
    }
  }
  .flex-col-center {
    color: ${color.text.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  .flex-col-center > h2 {
    color: ${color.text.primary};
  }
  .text-information {
    text-align: center;
    margin: 0;
  }
  .your-pools-container {
    position: relative;
    width: 100%;
  }
  .your-pools {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #707070;
    background-color: ${color.box.primary};
    border-radius: 6px;
    height: 258px;
    width: 100%;
  }
  .your-pools > h3 {
    margin: 0;
    text-align: center;
    font-size: 25px;
    color: ${color.text.alternative};
  }
  .buttons-wrapper {
    position: absolute;
    width: 100%;
    bottom: -25px;
    display: flex;
    justify-content: center;
    gap: 100px;
  }
  .buttons-wrapper > button {
    max-width: 200px;
  }
`;

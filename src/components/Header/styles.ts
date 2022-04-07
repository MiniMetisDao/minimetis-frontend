import { css, Theme } from "@emotion/react";
import logo from "assets/images/logo.svg";
import day from "assets/images/day.svg";
import night from "assets/images/night.svg";

export const styles = ({ color }: Theme) =>
  css`
    margin: 50px 20px;
    display: flex;
    justify-content: space-between;

    .left-wrapper,
    .right-wrapper {
      display: flex;
      align-items: end;
    }

    .logo {
      h1 {
        margin: 0 50px 0 0;
        height: 80px;
        width: 270px;
        line-height: 0;
        font-size: 0;
        color: transparent;
        background: url(${logo}) no-repeat;
        position: relative;

        a {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    }

    .menu {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      font-size: 20px;

      li {
        margin: 0 18px;
      }
      a {
        color: ${color.text.primary};
        text-decoration: none;
        line-height: 2;
      }
    }

    .wallet-connection {
      margin-left: 10px;
      display: flex;
    }
  `;

export const themeSwitchStyle =
  ({ theme }: { theme: string }) =>
  ({ color }: Theme) =>
    css`
      background: none;
      border: none;
      position: relative;
      padding-right: 45px;
      font-size: 15px;
      line-height: 35px;
      cursor: pointer;
      color: ${color.text.secondary};
      flex-shrink: 0;

      &::after {
        content: "";
        width: 35px;
        height: 35px;
        position: absolute;
        right: 0;
        background: url(${theme === "dark" ? day : night});
      }
    `;

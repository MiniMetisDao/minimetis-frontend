import { type Theme, css } from "@emotion/react";

import day from "assets/images/day.svg";
import logoLight from "assets/images/logo-light.svg";
import logo from "assets/images/logo.svg";
import night from "assets/images/night.svg";
import { Mode } from "theme";

export const styles =
  ({ theme }: { theme: Mode }) =>
  ({ color }: Theme) =>
    css`
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 5px ${color.primaryShadow};
      position: relative;
      .header {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
      }
      .left-wrapper,
      .right-wrapper {
        display: flex;
        align-items: center;
      }
      .right-wrapper {
        flex-shrink: 0;
      }

      @media (max-width: 1200px) {
        .right-wrapper {
          display: none;
        }
        .left-wrapper {
          flex: 1;
          justify-content: space-between;
        }
      }

      .logo {
        h1 {
          margin: 0 50px 0 0;
          height: 77px;
          width: 228px;
          line-height: 0;
          font-size: 0;
          color: transparent;
          background: url(${theme === "light" ? logoLight : logo}) no-repeat;
          position: relative;
          @media (max-width: 1200px) {
            margin-right: 10px;
          }
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
        flex-flow: wrap;

        ul {
          display: none;
        }
        li {
          margin: 0 18px;
          :hover {
            > ul {
              display: block;
              position: absolute;
              background: ${color.secondary};
              padding: 10px 0;
              margin: 0;
              list-style: none;
              border-radius: 3px;
              min-width: 100px;
              z-index: 100;
              a.active {
                border-bottom: 3px solid ${color.primary};
              }
            }
          }
        }
        a {
          color: ${color.text.primary};
          text-decoration: none;
          line-height: 2;
          &.active {
            border-bottom: 3px solid #04d8cc;
          }
        }
      }
      .desktop-menu {
        @media (max-width: 1200px) {
          display: none;
        }
      }
      .mobile-menu-wrapper {
        background: ${color.color5};
        padding: 0 20px;
        transition: max-height 0.25s ease-out, margin 0.25s linear;
        max-height: 0;
        overflow: hidden;
        align-items: flex-end;
        flex-direction: column;
        display: flex;

        ul {
          padding: 20px 0;
          width: 100%;
        }

        &.open {
          margin: 0 0 20px;
          transition: max-height 0.4s ease-in, margin 0.4s linear;
        }

        @media (max-width: 1200px) {
          &.open {
            max-height: 600px;
          }
        }
      }
      .mobile-menu {
        flex-direction: column;

        li {
          margin: 0;
        }
        a {
          display: block;
          padding: 0 18px;
          &.active {
            border-radius: 5px;
            background: ${color.text.alternative};
            border: none;
          }
        }
      }

      // Hamburger menu animation: https://codepen.io/ainalem/pen/wvKOEMV
      .hamburger-menu {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: none;

        @media (max-width: 1200px) {
          display: flex;
        }
      }
      .line {
        fill: none;
        stroke: ${color.text.primary};
        stroke-width: 6;
        transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
          stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      .line1 {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
      .line2 {
        stroke-dasharray: 60 60;
        stroke-width: 6;
      }
      .line3 {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
      .open .line1 {
        stroke-dasharray: 90 207;
        stroke-dashoffset: -134;
        stroke-width: 6;
      }
      .open .line2 {
        stroke-dasharray: 1 60;
        stroke-dashoffset: -30;
        stroke-width: 6;
      }
      .open .line3 {
        stroke-dasharray: 90 207;
        stroke-dashoffset: -134;
        stroke-width: 6;
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
      color: ${color.text.primary};
      flex-shrink: 0;

      @media (max-width: 1200px) {
        color: ${color.text.primary};
      }

      &::after {
        content: "";
        width: 35px;
        height: 35px;
        position: absolute;
        right: 0;
        background: url(${theme === "dark" ? day : night});
      }
      .mobile-menu-wrapper & {
        margin-bottom: 20px;
      }
    `;

import { type Theme, css } from "@emotion/react";

export const styles =
  () =>
  ({ color }: Theme) =>
    css`
      background-color: ${color.alternative};

      h1 {
        color: ${color.color5};
        font-size: 40px;
        text-align: center;
      }
      h2 {
        margin: 0;
        text-transform: uppercase;
        font-size: 20px;
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

      .table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
      }

      .table td:first-of-type {
        border-top-left-radius: 11px;
        border-bottom-left-radius: 11px;
      }

      .table td:last-of-type {
        border-bottom-right-radius: 11px;
        border-top-right-radius: 11px;
      }
      .table th,
      .table td {
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
      }

      .table th:first-of-type,
      .table td:first-of-type {
        text-align: left;
        width: 200px;
      }

      .table tr {
        width: 100%;
        transition: background-color 0.3s ease;
        cursor: pointer;
      }
      table tr:hover {
        background-color: gray;
        border-radius: 11px;
      }

      .table .no-hover:hover {
        background-color: transparent;
        cursor: default;
      }

      .table th {
        color: ${color.text.primary};
      }

      .table td {
        color: ${color.text.primary};
      }

      .table img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
      }

      .table .positive {
        color: green;
      }

      .table .negative {
        color: #b977ec;
      }
      .tokens {
        position: relative;
        height: 40px;
        display: flex;
        align-items: center;
      }
      .tokens > img {
        margin: 0;
      }
      .name-row {
        display: flex;
        width: 200px;
        align-items: center;
        justify-content: space-between;
      }
      .name-row .name {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .pagination {
        list-style: none;
        display: flex;
        gap: 5px;
      }

      .pagination li {
        cursor: pointer;
        padding: 5px 10px;
      }

      .pagination li.active {
        color: ${color.actionButton.active};
      }
      .flex-row-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      .selected_wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
        /* MOBILE FLEX COL */
        @media (max-width: 1200px) {
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
      }
      .w-full {
        width: 100%;
      }
    `;

/** @format */

import { css } from "@emotion/react";

export const styles = {
  BillDocContainer: css`
    @media (max-width: 820px) {
      display: none;
    }
    margin: 0 auto;
  `,
  billDoc: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
    font-size: 14px;
    line-height: 18px;
    width: 800px;
    margin: 10px auto;
    padding: 80px 50px;

    &:hover [data-comp="hover"] {
      background-color: #dfdfdf;
      transition: 0.3s;
      input {
        background-color: #dfdfdf;
        transition: 0.3s;
      }
    }
    [data-comp="hover"] {
      transition: 0.3s;
      &:hover {
        cursor: pointer;
      }
      input {
        transition: 0.3s;
      }
    }
  `,

  title: css`
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1.5px solid black;
    margin-bottom: 20px;
  `,

  titleFieldBold: css`
    font-weight: bold;
    font-size: 18px;
  `,

  fieldBold: css`
    font-weight: bold;
  `,

  infoContainer: css`
    display: flex;
    flex-direction: column;
  `,

  info: css`
    display: flex;
    margin-top: 10px;
  `,
  infoTitle: css`
    font-weight: bold;
    margin-right: 20px;
    flex: 0 0 15%;
  `,
  infoContent: css`
    display: flex;
    flex-direction: column;
  `,
  infoTitleInput: css`
    margin-bottom: 10px;
  `,

  basis: css`
    display: flex;
    flex-direction: column;
  `,

  details: css`
    display: grid;
    grid-template-columns: 10% 31% 15% 15% 14% 15%;
    border: 1px solid black;
    position: relative;

    div {
      padding: 10px;
      background-color: white;
    }
    div:not(:last-child) {
      border-right: 1px solid black;
    }
  `,

  total: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 10px;
    margin-right: 10px;
    line-height: 20px;
  `,

  totalColumn: css`
    font-weight: bold;
    margin-right: 50px;
  `,

  totalText: css`
    margin-top: 15px;
    font-weight: bold;
    border-bottom: 1.5px solid black;
  `,

  billAuthor: css`
    margin-top: 20px;
    font-weight: bold;
  `,

  billAuthorTitle: css`
    margin-bottom: 15px;
  `,
  detailsRemoveBtn: css`
    position: absolute;
    right: -30px;
    top: 25%;
    border: none;
    background-color: white;
    cursor: pointer;
  `,

  addButtonContainer: css`
    margin: 0;
  `,
  addButton: css`
    background-color: #f1f3f4;
    color: black;
    border-radius: 0;
  `,
};
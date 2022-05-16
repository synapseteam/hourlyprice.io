/** @format */

import { css } from "@emotion/react";
export const styles = {
  form: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0.2rem;
    width: 100%;
    max-width: 700px;
    align-self: center;
    padding-top: 10px;

    > * {S
      margin-top: 0.8rem;
    }
    &:first-of-type {
      margin-top: 0rem;
    }
  `,
  title: css`
    margin: 0rem;
    text-align: center;
  `,
  item: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.8rem;
    label {
      width: 48%;
    }
  `,
  itemLarge: css`
    width: 100%;
    margin-top: 0.8rem;
    label {
      width: 100%;
    }
  `,
  itemSmall: css`
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
    label {
      width: 36%;
      &:last-child {
        width: 20%;
      }
    }
  `,
  input: css`
    background: white;
    border: 1px solid #dbdbdb;
    color: #171d3d;
  `,
  formInputError: css`
    border-color: red !important;
  `,
  formError: css`
    color: red;
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 10px;
  `,
  link: (theme) => css`
    color: ${theme.linkColor};
  `,
};

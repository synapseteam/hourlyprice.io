/** @format */

import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  form: css`
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    align-self: center;
    padding-top: 10px;
    > * {
      margin-top: 0.8rem;
    }
    &:first-of-type {
      margin-top: 0rem;
    }

    @media (min-width: 720px) {
      width: 47%;
    }
  `,
  title: (theme: Theme): SerializedStyles => css`
    text-align: center;
    color: ${theme.senary};
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
  haveAccount: (theme: Theme): SerializedStyles => css`
    color: ${theme.senary};
  `,
  link: (theme: Theme): SerializedStyles => css`
    color: ${theme.linkColor};
  `,
};

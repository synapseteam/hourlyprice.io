import { css } from "@emotion/react";

export const styles = {
  input: css`
    border: none;
    margin: 1px;
    background: #fff;
    min-width: 28px;

    &:disabled {
      border: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
};

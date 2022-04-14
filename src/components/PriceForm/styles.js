import { css } from "@emotion/react";

export const styles = {
  form: css`
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

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
  currency: css`
    display: flex;
    justify-content: space-between;
    & > * {
      width: 48%;
    }
  `,
  buttons: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
  button: css`
    width: 47%;
  `,
  buttonWide: css`
    width: 100%;
  `,
  addToInvoiceButtonVisible: css`
    display: block;
  `,
  addToInvoiceButton: css`
    display: none;
  `,
};

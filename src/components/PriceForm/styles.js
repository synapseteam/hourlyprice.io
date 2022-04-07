import { css } from "@emotion/react";

export const styles = {
  form: css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    align-self: stretch;
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
    & button {
      text-transform: uppercase;
    }
  `,
};

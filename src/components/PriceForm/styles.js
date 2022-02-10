import { css } from "@emotion/react";

export const styles = {
  form: css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @media (min-width: 720px) {
      width: 47%;
    }
  `,
};

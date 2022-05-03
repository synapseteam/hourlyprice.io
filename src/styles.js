import { css } from "@emotion/react";

export const styles = {
  app: css`
    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  calculator: css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 720px) {
      flex-direction: column;
    }
  `,
};

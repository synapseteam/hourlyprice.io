import { css } from "@emotion/react";

export const styles = {
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

import { css } from "@emotion/react";

export const styles = {
  icon: css`
    font-size: 2rem;
    cursor: pointer;
    margin: 0 16px;
    @media (max-width: 420px) {
      margin: 0 4px;
    }
    &:hover {
      transform: scale(1.1);
    }
  `,
};

import { css } from "@emotion/react";

export const styles = {
  header: (theme) => css`
    background-color: ${theme.septenary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    position: sticky;
    top: 0;
    z-index: 3;
    box-shadow: ${theme.headerShadow};

    @media (min-width: 720px) {
      padding: 0.4rem 4rem !important;
    }
  `,
  rightHandContainer: css`
    position: relative;
  `,
};

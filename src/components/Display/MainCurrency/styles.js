import { css } from "@emotion/react";

export const styles = {
  title: css`
    margin: 0;
  `,
  mainContainer: (theme) => css`
    border-bottom: 1px solid ${theme.tertiary};
    min-height: 6.8rem;
  `,
  sum: (theme) => css`
    color: ${theme.secondary};
    font-weight: 700;
    line-height: 0.7;
    padding: 2.4rem 1rem;
    margin: 0;
    font-size: 3rem;
  `,
};

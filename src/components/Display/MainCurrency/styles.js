import { css } from "@emotion/react";

export const styles = {
  title: css`
    margin: 0;
    padding-top: 1rem;
  `,
  mainContainer: (theme) => css`
    border-bottom: 1px solid ${theme.tertiary};
    min-height: 4rem;
  `,
  sum: (theme) => css`
    color: ${theme.secondary};
    font-weight: 700;
    line-height: 0.7;
    padding: 1rem 1rem;
    margin: 0;
    font-size: 3rem;
  `,
};

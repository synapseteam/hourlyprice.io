import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  title: css`
    margin: 0;
  `,
  mainContainer: (theme: Theme): SerializedStyles => css`
    border-bottom: 1px solid ${theme.tertiary};
    min-height: 6.8rem;
  `,
  sum: (theme: Theme): SerializedStyles => css`
    color: ${theme.secondary};
    font-weight: 700;
    line-height: 0.7;
    padding: 2.4rem 1rem;
    margin: 0;
    font-size: 3rem;
    @media (max-width: 420px) {
      padding: 2.4rem 0rem;
    }
  `,
};

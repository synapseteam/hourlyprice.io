import { css, Theme } from "@emotion/react";

export const styles = {
  label: (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    color: ${theme.labelColor};
  `,
  error: css`
    margin: 0.3rem 0 0;
  `,
  input: (theme: Theme) => css`
    background: ${theme.inputBgColor};
    border: ${theme.inputBorder};
    border-radius: 0.3rem;
    color: ${theme.denary};
    padding: 0.8rem 1rem;
    margin-top: 0.4rem;

    outline: none;

    appearance: none;
  `,
};

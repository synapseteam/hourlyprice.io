import { css } from "@emotion/react";

export const styles = {
  label: (theme) => css`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    color: ${theme.labelColor};
    margin-top: 0.8rem;

    &:first-of-type {
      margin-top: 0;
    }
  `,
  select: (theme) => css`
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

import { css, Theme } from "@emotion/react";

export const styles = {
  buttonContainer: css`
    width: 100%;
    margin: 1.2rem 0 0.4rem;
  `,
  button: (theme: Theme) => css`
    border: ${theme.btnBorder};
    border-radius: 0.4rem;
    background-color: ${theme.nonary};
    width: 100%;
    color: ${theme.denary};
    padding: 0.7rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: ${theme.btnHoverColor};
    }
    &:disabled {
      background-color: ${theme.btnDisabledBgColor};
      color: ${theme.btnDisabledColor};
      cursor: not-allowed;
    }
  `,
};

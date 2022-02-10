import { css } from "@emotion/react";

export const styles = {
  buttonContainer: css`
    width: 100%;
    margin: 1.2rem 0 0.4rem;
  `,
  button: (theme) => css`
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
  `,
};

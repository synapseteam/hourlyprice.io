import { css } from "@emotion/react";

export const styles = {
  ratesInputsContainer: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,

  ratesInput: (theme) => css`
    background-color: ${theme.inputBgColor};
    border: ${theme.inputBorder};
    border-radius: 0.3rem;
    color: ${theme.denary};
    padding: 0.8rem 1rem;
    margin-top: 0.4rem;
    width: 22%;
    margin-top: 1.6rem;

    outline: none;
  `,
};

import { css } from "@emotion/react";

export const styles = {
  mainContainer: css`
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 3rem;
    display: flex;
    width: 100%;
    justify-content: space-around;
  `,
  subCurrencyContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  subCurrencyTitlte: (theme) => css`
    color: ${theme.secondary};
    font-size: 1rem;
  `,
  subCurrencySum: css`
    margin-top: 0.4rem;
    font-weight: 700;
  `,
};

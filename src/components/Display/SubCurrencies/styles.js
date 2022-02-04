import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

export const styles = {
  mainContainer: css`
    margin-top: 1.6rem;
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
    font-size: 0.8rem;
  `,
  subCurrencySum: css`
    margin-top: 0.4rem;
    font-weight: 700;
  `,
  getStyle,
};

import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import { blue, darkGrey } from "components/UI/sharedStylesEmotion/colors.js";

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
  subCurrencyTitlte: css`
    color: ${blue};
    font-size: 0.8rem;
  `,
  subCurrencyTitlteLight: css`
    color: ${darkGrey};
  `,
  subCurrencySum: css`
    margin-top: 0.4rem;
    font-weight: 700;
  `,
  getStyle,
};

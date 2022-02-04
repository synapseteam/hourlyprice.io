import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  white,
  darkPurple,
  lightGrey,
  lightPurple,
} from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  ratesInputsContainer: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,

  ratesInput: css`
    background-color: ${darkPurple};
    border: 1px solid ${lightPurple};
    border-radius: 0.3rem;
    color: ${white};
    padding: 0.8rem 1rem;
    margin-top: 0.4rem;
    width: 22%;
    margin-top: 1.6rem;
  `,
  ratesInputLight: css`
    background-color: ${white};
    border: 1px solid ${lightGrey};
    color: ${darkPurple};
    outline: none;
  `,
  getStyle,
};

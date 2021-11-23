import { css } from "@emotion/react";
import { getStyle } from "utils/generic";
import * as labelStyles from "components/UI/sharedStylesEmotion/styledLabel";

import {
  darkPurple,
  white,
  lightPurple,
  lightGrey,
} from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  ...labelStyles.styles,
  select: css`
    background-color: ${darkPurple};
    border: 1px solid ${lightPurple};
    border-radius: 0.3rem;
    color: ${white};
    padding: 0.8rem 1rem;
    margin-top: 0.4rem;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
  `,
  selectLight: css`
    background-color: ${white};
    border: 1px solid ${lightGrey};
    border-radius: 0.3rem;
    color: ${darkPurple};
    outline: none;
  `,
  getStyle,
};

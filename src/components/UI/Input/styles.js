import { css } from "@emotion/react";
import { getStyle } from "utils/generic";
import * as labelStyles from "components/UI/sharedStylesEmotion/styledLabel";

import {
  white,
  darkPurple,
  lightGrey,
  lightPurple,
} from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  ...labelStyles.styles,
  error: css`
    margin: 0.3rem 0 0;
  `,
  input: css`
    background-color: ${darkPurple};
    border: 1px solid ${lightPurple};
    border-radius: 0.3rem;
    color: ${white};
    padding: 0.7rem 1rem;
    margin-top: 0.3rem;
  `,
  inputLight: css`
    background-color: ${white};
    border: 1px solid ${lightGrey};
    color: ${darkPurple};
    outline: none;
  `,
  getStyle,
};

import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  lightPurple,
  blue,
  darkGrey,
} from "components/UI/sharedStylesEmotion/colors.js";

export const styles = {
  title: css`
    margin: 0;
  `,
  mainContainer: css`
    border-bottom: 1px solid lighten(${lightPurple}, 15);
    min-height: 6.8rem;
  `,
  sum: css`
    color: ${blue};
    font-weight: 700;
    line-height: 0.7;
    padding: 2.4rem 1rem;
    margin: 0;
    font-size: 3rem;
  `,
  sumLight: css`
    color: ${darkGrey};
  `,
  getStyle,
};

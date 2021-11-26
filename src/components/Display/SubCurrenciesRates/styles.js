import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  mediumGrey,
  darkPurple,
  blue,
  darkGrey,
} from "components/UI/sharedStylesEmotion/colors.js";

export const styles = {
  ratesContainer: css`
    background-color: ${darkPurple};
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: 0 0 0.4rem 0.4rem;
    bottom: 0;
  `,
  ratesContainerLight: css`
    background-color: ${mediumGrey};
  `,
  rateText: css`
    font-size: 0.8rem;
    line-height: 0.5;
  `,
  ratesDelimiter: css`
    color: ${blue};
    margin: 0 0.6rem;
  `,
  ratesDelimiterLight: css`
    color: ${darkGrey};
  `,
  getStyle,
};

import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import { darkGrey } from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  logo: css`
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 0.6;
    cursor: pointer;
  `,
  logoLight: css`
    color: ${darkGrey};
  `,
  getStyle,
};

import { css } from "@emotion/react";
import {
  purple,
  darkPurple,
  white,
} from "components/UI/sharedStylesEmotion/colors.js";
import { getStyle } from "utils/generic";

export const styles = {
  app: css`
    min-height: 100vh;
    width: 100%;
    background-color: ${purple};
    color: ${white};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  appLight: css`
    background-color: ${white};
    color: ${darkPurple};
  `,
  getStyle,
};

import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  lightPurple,
  white,
  lightGrey,
} from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  header: css`
    background-color: ${lightPurple};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;

    @media (min-width: 720px) {
      padding: 0.5rem 4rem !important;
    }
  `,
  headerLight: css`
    background-color: ${white};
    box-shadow: 0 1px 3px ${lightGrey};
  `,
  rightHandContainer: css`
    position: relative;
  `,
  getStyle,
};

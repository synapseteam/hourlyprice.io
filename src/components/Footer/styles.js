import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  lightPurple,
  purple,
  white,
  darkGrey,
} from "components/UI/sharedStylesEmotion/colors.js";

export const styles = {
  footer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid ${lightPurple};
    padding: 0.5rem;
    background-color: ${purple};
  `,
  footerLight: css`
    border: none;
    background-color: ${white};
    box-shadow: -1px -1px 3px #ddd;
  `,
  footerText: css`
    font-weight: 500;
    font-size: 0.9rem;
  `,
  footerLink: css`
    text-decoration: none;
    color: ${white};
  `,
  footerLinkLight: css`
    color: ${darkGrey};
  `,
  getStyle,
};

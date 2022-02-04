import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  lightPurple,
  purple,
  white,
  darkGrey,
} from "components/UI/sharedStylesEmotion/colors.js";

export const styles = {
  footer: (theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${theme.footerBorderTop};
    padding: 0.5rem;
    background-color: ${theme.quinary};
    box-shadow: ${theme.footerShadow};
  `,

  footerText: css`
    font-weight: 500;
    font-size: 0.9rem;
  `,
  footerLink: (theme) => css`
    text-decoration: none;
    color: ${theme.senary};
  `,
};

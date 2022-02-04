import { css } from "@emotion/react";

import {
  purple,
  darkPurple,
  darkGrey,
  white,
  brightGrey,
} from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  langContainer: (theme) => css`
    position: absolute;
    top: 0;
    left: -200%;
    background-color: ${theme.octonary};
    border: ${theme.langListBorder};
    border-radius: 0.4rem;
  `,
  langList: css`
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
    margin: 0;
  `,
  langListItem: css`
    list-style: none;
    padding: 0.3rem;
  `,
  langListLink: (theme) => css`
    text-decoration: none;
    color: ${theme.senary};
  `,
};

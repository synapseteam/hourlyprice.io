import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  purple,
  darkPurple,
  darkGrey,
  white,
  brightGrey,
} from "components/UI/sharedStylesEmotion/colors";

export const styles = {
  langContainer: css`
    position: absolute;
    top: 0;
    left: -200%;
    background-color: ${purple};
    border: 1px solid ${darkPurple};
    border-radius: 0.4rem;
  `,
  langContainerLight: css`
    background-color: ${brightGrey};
    border: none;
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
  langListLink: css`
    text-decoration: none;
    color: ${white};
  `,
  langListLinkLight: css`
    color: ${darkGrey};
  `,
  getStyle,
};

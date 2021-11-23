import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

import {
  lightPurple,
  brightGrey,
} from "components/UI/sharedStylesEmotion/colors.js";

const mixinShadow = `
-webkit-box-shadow: 0px 18px 23px -3px rgba(0, 0, 0, 0.51);
-moz-box-shadow: 0px 18px 23px -3px rgba(0, 0, 0, 0.51);
box-shadow: 0px 18px 23px -3px rgba(0, 0, 0, 0.51);
`;

const mixinNoShadow = `
-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
`;

export const styles = {
  display: css`
    background-color: ${lightPurple};
    border-radius: 0.4rem;
    position: relative;
    width: 100%;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${mixinShadow};
  `,
  displayLight: css`
    background-color: ${brightGrey};
    ${mixinNoShadow}
  `,
  getStyle,
};

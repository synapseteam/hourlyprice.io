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
    margin-top: 1.2rem;
    ${mixinShadow};

    @media (min-width: 720px) and (max-width: 919px) {
      width: 47%;
      padding: 3rem 1rem;
    }

    @media (min-width: 920px) {
      width: 47%;
    }
  `,
  displayLight: css`
    background-color: ${brightGrey};
    ${mixinNoShadow}
  `,
  getStyle,
};

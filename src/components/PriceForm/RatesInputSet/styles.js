import { css } from "@emotion/react";
import { getStyle } from "utils/generic";
import * as inputStyles from "components/UI/sharedStylesEmotion/styledInput";

export const styles = {
  ratesInputsContainer: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,

  ratesInput: css`
    ${inputStyles.styles.input}
    width: 22%;
    margin-top: 1.6rem;
  `,
  ratesInputLight: css`
    ${inputStyles.styles.inputLight}
  `,
  getStyle,
};

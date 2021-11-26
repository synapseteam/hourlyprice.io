import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

const blue = "#5599ec";
const purple = "#24274a";

export const styles = {
  label: css`
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    color: ${blue};
    margin-top: 1.2rem;

    &:first-of-type {
      margin-top: 0;
    }
  `,
  labelLight: css`
    color: ${purple};
  `,
  getStyle,
};

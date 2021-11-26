import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

export const styles = {
  icon: css`
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  `,
  getStyle,
};

import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

export const styles = {
  form: css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @media (min-width: 720px) {
      width: 47%;
    }
  `,
  getStyle,
};

import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

export const styles = {
  contentContainer: css`
    width: 96%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 720px) {
      width: 700px;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: start;
      align-content: flex-start;
      flex: 1;
    }
  `,
  getStyle,
};

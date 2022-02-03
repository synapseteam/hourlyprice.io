import { css } from "@emotion/react";
import { getStyle } from "utils/generic";

const green = "#174f5e";
const lightgreen = "#5cbabc";
const white = "#ffffff";
const lightGrey = "#e5e5e5";
const black = "#000000";
const darkGrey = "#d5d3d3";

export const styles = {
  buttonContainer: css`
    width: 100%;
    margin: 1.2rem 0 0.4rem;
  `,
  button: css`
    border: 1px solid ${lightgreen};
    border-radius: 0.4rem;
    background-color: ${green};
    width: 100%;
    color: ${white};
    padding: 0.7rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: ${lightgreen};
    }
  `,

  buttonLight: css`
    border: none;
    background-color: ${lightGrey};
    color: ${black};

    &:hover {
      background-color: ${darkGrey};
    }
  `,
  getStyle,
};

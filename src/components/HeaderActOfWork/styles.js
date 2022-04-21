import { css } from "@emotion/react";

export const styles = {
  arrow: css`
    margin-left: 30px;
  `,
  link: (theme) => css`
    padding: 0px 10px;
    text-decoration: none;
    color: ${theme.senary};
  `,
  arrowImg: css`
    margin-top: 7px;
    height: 25px;
  `,
};

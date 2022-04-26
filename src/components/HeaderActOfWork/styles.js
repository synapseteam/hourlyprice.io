import { css } from "@emotion/react";

export const styles = {
  arrow: css`
    margin-left: 30px;
  `,
  actOfWork: css`
    position: relative;
    &:hover [data-comp="list"] {
      display: block;
    }
  `,
  dropdown: (theme) => css`
    display: none;
    background-color: ${theme.primary};
    position: absolute;
    color: ${theme.senary};
    top: 38px;
    width: 100%;
    li {
      cursor: pointer;
      list-style-type: none;
      padding: 10px;
      :hover {
        background-color: ${theme.quinary};
      }
    }
  `,

  link: (theme) => css`
    padding: 20px 10px;
    text-decoration: none;
    color: ${theme.senary};
  `,
  arrowImg: css`
    margin-top: 7px;
    height: 25px;
  `,
};

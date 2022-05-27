import { css } from "@emotion/react";

export const styles = {
  arrow: css`
    margin-left: 30px;
  `,
  actOfWork: css`
    position: relative;
    &:hover [data-comp="hover"] {
      display: block;
    }
  `,
  actOfWorkUpdated: (theme) => css`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    background-color: ${theme.primary};
    border-radius: 5px;
    transform: translateY(-10px);
    text-align: center;
    padding: 10px;
    animation-name: opacityChange;
    animation-duration: 2s;
    z-index: 3;
    width: 170px;
    @keyframes opacityChange {
      0% {
        opacity: 0;
        background-color: ${theme.octonary};
      }
      50% {
        opacity: 1;
        background-color: ${theme.senary};
        color: ${theme.primary};
      }
      100% {
        background-color: ${theme.octonary};
        opacity: 0;
      }
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
    @media (max-width: 820px) {
      display: none;
    }
  `,
  arrowImg: css`
    margin-top: 7px;
    height: 25px;
  `,
};

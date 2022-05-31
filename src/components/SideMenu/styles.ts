import { css, Theme } from "@emotion/react";

export const styles = {
  SideMenu: (theme: Theme) => css`
    width: 250px;
    background-color: ${theme.primary};
    color: ${theme.denary};
    @media (max-width: 1080px) {
      display: none;
    }
  `,

  addButton: css`
    background-color: #f1f3f4;
    color: black;
    border-radius: 0;
    width: 200px;
  `,
  addButtonContainer: css`
    margin: 0 auto;
    width: 200px;
  `,

  list: css`
    list-style: none;
    padding: 0 10px;
  `,
};
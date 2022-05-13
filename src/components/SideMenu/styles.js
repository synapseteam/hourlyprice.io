import { css } from "@emotion/react";

export const styles = {
  SideMenu: (theme) => css`
    width: 250px;
    background-color: ${theme.primary};
    color: ${theme.denary};
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
};

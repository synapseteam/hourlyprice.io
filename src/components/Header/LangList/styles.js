import { css } from "@emotion/react";

export const styles = {
  langContainer: css`
    border-radius: 0.4rem;
    margin: 0 16px;
  `,
  langList: (theme) => css`
    display: flex;
    padding: 0.3rem;
    background-color: ${theme.octonary};
    border: ${theme.langListBorder};
    color: ${theme.senary};
    height: 2.5rem;
    border-radius: 0.4rem;
    margin: 0;
    text-transform: uppercase;
  `,
  langListItem: css`
    list-style: none;
    padding: 0.3rem;
  `,
  langListLink: (theme) => css`
    text-decoration: none;
    color: ${theme.senary};
  `,
};

import { css } from "@emotion/react";

export const styles = {
  langContainer: (theme) => css`
    background-color: ${theme.octonary};
    border: ${theme.langListBorder};
    border-radius: 0.4rem;
    margin: 0 16px;
  `,
  langList: css`
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
    margin: 0;
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

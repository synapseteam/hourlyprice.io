import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  footer: (theme: Theme): SerializedStyles => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${theme.footerBorderTop};
    padding: 0.5rem;
    background-color: ${theme.primary};
    box-shadow: ${theme.footerShadow};
    transition: background 0.5s;
    margin-top: auto;
  `,

  footerText: css`
    font-weight: 500;
    font-size: 0.9rem;
  `,
  footerLink: (theme: Theme): SerializedStyles => css`
    text-decoration: none;
    color: ${theme.senary};
  `,
};

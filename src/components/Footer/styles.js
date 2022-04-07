import { css } from "@emotion/react";

export const styles = {
  footer: (theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${theme.footerBorderTop};
    padding: 0.5rem;
    background-color: ${theme.quinary};
    box-shadow: ${theme.footerShadow};
  `,

  footerText: css`
    font-weight: 500;
    font-size: 1rem;
  `,
  footerLink: (theme) => css`
    text-decoration: none;
    color: ${theme.senary};
  `,
};

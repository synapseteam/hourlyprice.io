import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  logo: (theme: Theme): SerializedStyles => css`
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 0.6;
    cursor: pointer;
    color: ${theme.senary};
    text-decoration: none;
  `,
};

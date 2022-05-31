import { css, Theme } from "@emotion/react";

export const styles = {
  registrationPage: (theme: Theme) => css`
    background-color: ${theme.quinary};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `,
};

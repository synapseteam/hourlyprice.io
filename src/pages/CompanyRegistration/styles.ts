import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  registrationPage: (theme: Theme): SerializedStyles => css`
    background-color: ${theme.quinary};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `,
};

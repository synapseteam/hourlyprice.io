import { css, Theme } from "@emotion/react";

export const styles = {
  display: (theme: Theme) => css`
    background-color: ${theme.primary};
    border-radius: 0.4rem;
    position: relative;
    width: 47%;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.2rem;
    box-shadow: ${theme.shadow};
    text-align: center;
    @media (max-width: 420px) {
      padding: 3rem 0.5rem;
    }
    @media (max-width: 720px) {
      width: 100%;
    }
  `,
};

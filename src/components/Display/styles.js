import { css } from "@emotion/react";

export const styles = {
  display: (theme) => css`
    background-color: ${theme.primary};
    border-radius: 0.4rem;
    position: relative;
    width: 100%;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.2rem;
    box-shadow: ${theme.shadow};
    text-align: center;
    @media (min-width: 720px) and (max-width: 919px) {
      width: 47%;
    }

    @media (min-width: 920px) {
      width: 47%;
    }
  `,
};

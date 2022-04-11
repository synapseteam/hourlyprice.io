import { css } from "@emotion/react";

export const styles = {
  display: (theme) => css`
    background-color: ${theme.primary};
    border-radius: 0.4rem;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.2rem;
    box-shadow: ${theme.shadow};
    text-align: center;
    height: 360px;
    @media (min-width: 720px) and (max-width: 919px) {
      width: 47%;
    }

    @media (min-width: 920px) {
      width: 47%;
    }
  `,
  button: css`
    width: 80%;
    margin-top: auto;
    margin-bottom: 0.5rem;
    & button {
      text-transform: uppercase;
    }
  `,
};

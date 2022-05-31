import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  contentContainer: (theme: Theme): SerializedStyles => css`
    width: 100%;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-self: stretch;

    background-color: ${theme.quinary};
    color: ${theme.denary};
    transition: background 0.5s;

    @media (min-width: 720px) and (max-width: 920px) {
      padding: 1rem 2rem;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: start;
      align-content: flex-start;
      flex: 1;
    }

    @media (min-width: 920px) and (max-width: 1099px) {
      padding: 1rem 5rem;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: start;
      align-content: flex-start;
      flex: 1;
    }

    @media (min-width: 1100px) {
      padding: 1rem 20%;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: start;
      align-content: flex-start;
      flex: 1;
    }
  `,
};

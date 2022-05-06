import { css } from "@emotion/react";

export const styles = {
  container: css`
    width: 100%;
  `,
  title: css`
    font-style: italic;
    line-height: 1;
    margin: 1.4rem 0 0 0;
    @media (max-width: 720px) {
      margin: 0;
    }
  `,
  subTitle: css`
    font-size: 1rem;
    font-style: italic;
    font-weight: 400;
    margin-bottom: 1.8rem;
  `,
};

import { css } from "@emotion/react";

export const styles = {
  ratesContainer: (theme) => css`
    background-color: ${theme.quaternary};
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: 0 0 0.4rem 0.4rem;
    bottom: 0;
  `,
  rateText: css`
    font-size: 0.8rem;
    line-height: 0.5;
  `,
  ratesDelimiter: (theme) => css`
    color: ${theme.secondary};
    margin: 0 0.6rem;
  `,
};

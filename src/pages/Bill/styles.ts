/** @format */

import { css, Theme } from "@emotion/react";

export const styles = {
  BillDoc: (theme: Theme) => css`
    background-color: ${theme.octonary};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `,
  contentContainer: css`
    display: flex;
  `,
  noPreviewMessage: (theme: Theme) => css`
    display: none;
    font-size: 28px;
    line-height: 36px;
    color: ${theme.denary};
    margin: 50px 20px;
    text-align: center;
    @media (max-width: 820px) {
      display: block;
    }
  `,
};

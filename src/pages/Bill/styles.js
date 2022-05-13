/** @format */

import { css } from "@emotion/react";

export const styles = {
  BillDoc: (theme) => css`
    background-color: ${theme.octonary};
  `,
  contentContainer: css`
    display: flex;
  `,
  noPreviewMessage: (theme) => css`
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

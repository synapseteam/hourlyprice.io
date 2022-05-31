import { css, Theme, SerializedStyles } from "@emotion/react";

export const styles = {
  ActOfWorkPage: (theme: Theme): SerializedStyles => css`
    background-color: ${theme.octonary};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `,
  contentContainer: css`
    display: flex;
  `,

  noPreviewMessage: (theme: Theme): SerializedStyles => css`
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

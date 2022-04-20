import { css } from "@emotion/react";

export const styles = {
  langContainer: css`
    border-radius: 0.4rem;
  `,
  langIcon: css`
    padding-top: 4px;
    width: 32px;
    &:hover {
      cursor: pointer;
    }
    &:hover .langTooltip {
      visibility: visible;
    }
  `,
};

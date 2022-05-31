import { css } from "@emotion/react";

export const styles = {
  langContainer: css`
    border-radius: 0.4rem;
  `,
  langIcon: css`
    width: 32px;
    &:hover {
      cursor: pointer;
    }
    &:hover .langTooltip {
      visibility: visible;
    }
  `,
};

import { css } from "@emotion/react";

export const styles = {
  header: (theme) => css`
    background-color: ${theme.septenary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    position: sticky;
    top: 0;
    z-index: 3;
    box-shadow: ${theme.headerShadow};

    @media (min-width: 720px) {
      padding: 0.4rem 4rem !important;
    }
  `,
  rightHandContainer: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  invoiceIcon: css`
    cursor: pointer;
    height: 40px;
    width: 40px;
  `,
  createInvoiceButton: css`
    background-color: #24274a;
    border: 1px solid #171d3d;
    padding: 10px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(36, 39, 74, 0.3);
    }
  `,
  noPreviewMessage: css`
    font-size: 28px;
    line-height: 36px;
    color: #212121;
    margin: 50px 20px;
  `,
};

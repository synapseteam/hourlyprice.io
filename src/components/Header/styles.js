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
  invoice: (theme) => css`
    display: flex;
    align-items: center;
    background-color: ${theme.octonary};
    border: ${theme.langListBorder};
    border-radius: 0.4rem;
    color: ${theme.senary};
    padding: 0rem 0.5rem;
    cursor: pointer;
    height: 40px;
  `,

  invoiceAnimation: (theme) => css`
    animation-name: colorChange;
    animation-duration: 2s;
    @keyframes colorChange {
      0% {
        background-color: ${theme.octonary};
      }
      50% {
        background-color: ${theme.senary};
        color: ${theme.octonary};
      }
      100% {
        background-color: ${theme.octonary};
      }
    }
  `,

  invoiceIcon: css`
    height: 40px;
    width: 40px;
    margin-left: 0.3rem;
  `,

  noPreviewMessage: css`
    font-size: 28px;
    line-height: 36px;
    color: #212121;
    margin: 50px 20px;
  `,
  buttons: css`
    width: 100%;
    display: flex;
    justify-content: center;
    & button {
      text-transform: uppercase;
    }
  `,
  button: css`
    margin: 0px 10px;
    width: 35%;
  `,
};

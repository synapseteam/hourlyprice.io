import { css } from "@emotion/react";

export const styles = {
  header: (theme) => css`
    background-color: ${theme.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    padding: 0.4rem;
    position: sticky;
    top: 0;
    z-index: 3;
    box-shadow: ${theme.headerShadow};
    transition: background 0.5s;

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
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 0.4rem;
    color: ${theme.senary};
    cursor: pointer;
    margin-bottom: 5px;
    @media (max-width: 420px) {
      padding: 0rem 0.1rem;
    }
  `,
  actOfWork: css`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 0.4rem;
    cursor: pointer;
    height: 40px;
    @media (max-width: 420px) {
      display: none;
    }
  `,
  accountDropdown: (theme) => css`
    position: absolute;
    top: 50px;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: ${theme.primary};
    width: 250px;
    padding: 20px 20px 40px;
    z-index: 3;
    & > * {
      padding: 10px 0px;
      color: ${theme.denary};
      font-size: 18px;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  `,
  report: css`
    height: 1200px;
  `,
  item: css`
    position: relative;
    margin: 0 5px;
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
        color: ${theme.senary};
      }
      100% {
        background-color: ${theme.octonary};
      }
    }
  `,
  invoiceIcon: css`
    height: 30px;
    width: 30px;
    z-index: 2;

    @media (max-width: 420px) {
      margin-left: 0rem;
    }
  `,
  loginIcon: css`
    height: 40px;
    width: 40px;
    z-index: 2;
    :hover {
      cursor: pointer;
    }
    @media (max-width: 420px) {
      margin-left: 0rem;
    }
  `,
  invoiceXIcon: css`
    position: absolute;
    right: 9px;
    height: 30px;
    width: 30px;
    opacity: 0;
    @media (max-width: 420px) {
      right: 2px;
    }
  `,
  arrowImg: css`
    height: 25px;
    transform: scaleX(-1);
  `,
  invoiceXIconAnimation: css`
    animation-name: opacityChange;
    animation-duration: 2s;
    z-index: 3;
    @keyframes opacityChange {
      0% {
        opacity: 0;
      }

      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `,

  invoiceText: css`
    @media (max-width: 420px) {
      display: none;
    }
  `,
  noPreviewMessage: css`
    font-size: 28px;
    line-height: 36px;
    color: #212121;
    margin: 50px 20px;
    text-align: center;
  `,
};

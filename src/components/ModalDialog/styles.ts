import { css, Theme } from "@emotion/react";

export const styles = {
  overlay: (theme: Theme) => css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${theme.modalOverlay};
    z-index: 3;
  `,
  modal: css`
    display: flex;
    padding: 50px 25px 25px;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 580px;
    width: 912px;
    background: #fff;
    z-index: 5;
    &.show {
      -webkit-animation-name: modal-animation;
      -webkit-animation-duration: 0.5s;
      animation-name: modal-animation;
      animation-duration: 0.5s;
      top: 50%;
    }
    @-webkit-keyframes modal-animation {
      from {
        top: -500px;
        opacity: 0;
      }
      to {
        top: 50%;
        opacity: 1;
      }
    }
    @keyframes modal-animation {
      from {
        top: -500px;
        opacity: 0;
      }
      to {
        top: 50%;
        opacity: 1;
      }
    }
    @media (max-width: 920px) {
      width: 100%;
      padding: 0;
    }
  `,
  title: css`
    margin: 0 0 16px;
    font-size: 32px;
    line-height: 36px;
  `,
  content: css`
    height: 100%;
    max-height: 80%;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 920px) {
      overflow-y: hidden;
    }
  `,
  closeButton: css`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  `,
};

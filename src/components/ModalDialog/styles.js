import { css } from "@emotion/react";

export const styles = {
  overlay: (theme) => css`
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
    padding: 25px;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 500px;
    max-width: 700px;
    width: 100%;
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
  `,
  intro: css``,
  closeButton: css`
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
  modalFooter: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  `,
};

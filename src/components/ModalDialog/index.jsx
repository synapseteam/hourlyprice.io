/** @jsxImportSource @emotion/react */
import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { styles } from "./styles";

const ModalCloseButton = ({ onClick }) => (
  <span css={styles.closeButton} onClick={onClick}>
    Close Button
  </span>
);

export const ModalDialog = ({
  isOpen = false,
  children,
  title = "",
  intro = "",
  onClose,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div css={styles.overlay} />
      <div css={styles.modal} className={"show"}>
        {title && <h1 css={styles.title}>{title}</h1>}
        {intro && <p css={styles.intro}>{intro}</p>}
        {children && <div css={styles.content}>{children}</div>}
        <div css={styles.modalFooter}>
          <ModalCloseButton onClick={onClose} />
        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalDialog;

ModalDialog.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  title: PropTypes.string,
  intro: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

ModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

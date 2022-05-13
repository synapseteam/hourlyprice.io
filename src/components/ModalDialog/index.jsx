/** @jsxImportSource @emotion/react */
import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import CloseIcon from "../../assets/close.svg";
import { useCustomTranslation } from "../../i18n";
import { styles } from "./styles";

const ModalCloseButton = ({ onClick }) => {
  const [t] = useCustomTranslation();

  return (
    <span css={styles.closeButton} onClick={onClick}>
      {t("closeButtonText")}
    </span>
  );
};

export const ModalDialog = ({
  isOpen = false,
  children,
  title = "",
  onClose,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div css={styles.overlay} onClick={onClose} />
      <div css={styles.modal} className={"show"}>
        {title && <h1 css={styles.title}>{title}</h1>}
        {children && <div css={styles.content}>{children}</div>}
        <img src={CloseIcon} css={styles.closeButton} onClick={onClose} />
      </div>
    </>,
    document.body
  );
};

export default ModalDialog;

ModalDialog.propTypes = {
  isOpen: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  title: PropTypes.string,
  intro: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

ModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

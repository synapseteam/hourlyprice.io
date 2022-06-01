/** @jsxImportSource @emotion/react */
import { SerializedStyles } from "@emotion/serialize";
import { createPortal } from "react-dom";
import CloseIcon from "../../assets/close.svg";
import { styles } from "./styles";

interface IProps {
  isOpen: boolean;
  children?: JSX.Element | JSX.Element[];
  title?: string;
  onClose: () => void;
  className?: SerializedStyles;
}

export const ModalDialog: React.FC<IProps> = ({
  isOpen,
  children,
  title = "",
  onClose,
  className,
}): JSX.Element => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div css={styles.overlay} onClick={onClose} />
      <div css={[styles.modal, className]} className={"show"}>
        {title && <h1 css={styles.title}>{title}</h1>}
        {children && <div css={styles.content}>{children}</div>}
        <img src={CloseIcon} css={styles.closeButton} onClick={onClose} />
      </div>
    </>,
    document.body
  );
};

export default ModalDialog;

/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import JsPDF from "jspdf";
import InvoiceIcon from "../../assets/invoice.svg";
import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import ModalDialog from "components/ModalDialog";
import Invoice from "components/Invoice";
import { INVOICE_PREVIEW_SUPPORTED_RESOLUTION } from "../../configure";
import { toggleEditMode, setInvoiceItemAdded } from "features/generic";
import { useWindowDimensions } from "../../hooks";
import { useCustomTranslation } from "../../i18n";
import Button from "components/UI/Button";
import { styles } from "./styles";

export default function Header({ setIsDark, isDark }) {
  const dispatch = useDispatch();
  const isEditMode = useSelector((state) => state.generic.isEditMode);
  const isInvoiceItemAdded = useSelector(
    (state) => state.generic.isInvoiceItemAdded
  );

  const { width } = useWindowDimensions();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [t] = useCustomTranslation();

  const toggleInvoiceModal = () => {
    if (!isInvoiceModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    setIsInvoiceModalOpen(!isInvoiceModalOpen);
  };

  const generatePDF = () => {
    const report = new JsPDF("p", "pt", [700, 900]);
    report.viewerPreferences({ FitWindow: true, CenterWindow: true }, true);
    report.html(document.querySelector("#report"), { margin: 20 }).then(() => {
      report.save("report.pdf");
    });
  };

  const handleToggleEditMode = () => {
    return dispatch(toggleEditMode());
  };

  useEffect(() => {
    if (isInvoiceItemAdded) {
      setTimeout(() => {
        dispatch(setInvoiceItemAdded(false));
      }, 2000);
    }
  }, [isInvoiceItemAdded]);

  const invoiceStyles = [
    styles.invoice,
    isInvoiceItemAdded ? styles.invoiceAnimation : null,
  ];

  return (
    <header css={styles.header}>
      <Logo />
      <div css={styles.rightHandContainer}>
        <div css={invoiceStyles} onClick={toggleInvoiceModal}>
          {t("invoice")}
          <img src={InvoiceIcon} css={styles.invoiceIcon} />
        </div>
        <LangList />
        <ThemeSwitcher setIsDark={setIsDark} isDark={isDark} />
      </div>
      <ModalDialog isOpen={isInvoiceModalOpen} onClose={toggleInvoiceModal}>
        {width >= INVOICE_PREVIEW_SUPPORTED_RESOLUTION && (
          <div id="report">
            <Invoice />
          </div>
        )}
        {width < INVOICE_PREVIEW_SUPPORTED_RESOLUTION && (
          <span css={styles.noPreviewMessage}>
            {t("noPreviewSupportedMessage")}
          </span>
        )}
        <div css={styles.buttons}>
          <div css={styles.button}>
            <Button onClick={handleToggleEditMode} type="button">
              {isEditMode ? t("save") : t("edit")}
            </Button>
          </div>
          <div css={styles.button}>
            <Button onClick={generatePDF} type="button" disabled={isEditMode}>
              {t("exportToPDFText")}
            </Button>
          </div>
        </div>
      </ModalDialog>
    </header>
  );
}

Header.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};

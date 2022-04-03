/** @jsxImportSource @emotion/react */
import { useState } from "react";
import PropTypes from "prop-types";
import JsPDF from "jspdf";
import InvoiceIcon from "../../assets/invoice.svg";
import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import ModalDialog from "components/ModalDialog";
import Invoice from "components/Invoice";
import { INVOICE_PREVIEW_SUPPORTED_RESOLUTION } from "../../configure";
import { useWindowDimensions } from "../../hooks";
import { useCustomTranslation } from "../../i18n";
import { styles } from "./styles";

export default function Header({ setIsDark }) {
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
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report"), { margin: 20 }).then(() => {
      report.save("report.pdf");
    });
  };

  return (
    <header css={styles.header}>
      <Logo />
      <div css={styles.rightHandContainer}>
        <img
          src={InvoiceIcon}
          css={styles.invoiceIcon}
          onClick={toggleInvoiceModal}
        />
        <LangList />
        <ThemeSwitcher setIsDark={setIsDark} />
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
        <button
          css={styles.createInvoiceButton}
          onClick={generatePDF}
          type="button"
        >
          {t("exportToPDFText")}
        </button>
      </ModalDialog>
    </header>
  );
}

Header.propTypes = {
  setIsDark: PropTypes.func.isRequired,
};

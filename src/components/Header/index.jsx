/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout, reset } from "../../features/auth";
import PropTypes from "prop-types";
import InvoiceIcon from "../../assets/invoice-ticket.png";
import RedXIcon from "../../assets/red-x.png";
import ArrowIcon from "../../assets/arrow-right.png";
import LoginIcon from "../../assets/login.png";
import LoginWhiteIcon from "../../assets/login-white.png";
import LogoutIcon from "../../assets/logout.png";
import ArrowWhiteIcon from "../../assets/arrow-right-white.png";
import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import ModalDialog from "components/ModalDialog";
import Invoice from "components/Invoice";
import { INVOICE_PREVIEW_SUPPORTED_RESOLUTION } from "../../configure";
import { setInvoiceItemAdded, setInvoiceFull } from "features/generic";
import { useWindowDimensions } from "../../hooks";
import { useCustomTranslation } from "../../i18n";
import { ROUTES } from "../../utils/urls";
import { toast } from "react-toastify";
import { styles } from "./styles";

export default function Header({ setIsDark, isDark }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isInvoiceItemAdded = useSelector(
    (state) => state.generic.isInvoiceItemAdded
  );

  const isInvoiceFull = useSelector((state) => state.generic.isInvoiceFull);

  const { width } = useWindowDimensions();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [t] = useCustomTranslation();
  const { i18n } = useTranslation();

  const toggleInvoiceModal = () => {
    if (!isInvoiceModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    setIsInvoiceModalOpen(!isInvoiceModalOpen);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.info(t("logout"));
    navigate("/");
  };

  useEffect(() => {
    if (isInvoiceItemAdded) {
      setTimeout(() => {
        dispatch(setInvoiceItemAdded(false));
      }, 2000);
    }
  }, [isInvoiceItemAdded]);

  useEffect(() => {
    if (isInvoiceFull) {
      setTimeout(() => {
        dispatch(setInvoiceFull(false));
      }, 2000);
    }
  }, [isInvoiceFull]);

  const invoiceStyles = [
    styles.invoice,
    isInvoiceItemAdded ? styles.invoiceAnimation : null,
  ];
  const invoiceXIconStyles = [
    styles.invoiceXIcon,
    isInvoiceFull ? styles.invoiceXIconAnimation : null,
  ];

  return (
    <header css={styles.header}>
      <Logo />
      <div css={styles.rightHandContainer}>
        <div css={styles.item}>
          {i18n.language === "ua" && (
            <Link
              to={ROUTES.actOfWork}
              css={styles.actOfWork}
              data-tip={"Акт виконаних робіт"}
            >
              {!isDark && (
                <img css={styles.arrowImg} src={ArrowIcon} alt="arrow" />
              )}
              {isDark && (
                <img css={styles.arrowImg} src={ArrowWhiteIcon} alt="arrow" />
              )}
              <ReactTooltip place="bottom" effect="solid" />
            </Link>
          )}
        </div>
        <div css={styles.item}>
          <div
            data-tip={t("invoice")}
            css={invoiceStyles}
            onClick={toggleInvoiceModal}
          >
            <ReactTooltip place="bottom" effect="solid" />
            <img src={RedXIcon} css={invoiceXIconStyles} />
            <img src={InvoiceIcon} css={styles.invoiceIcon} />
          </div>
        </div>
        <div css={styles.item}>
          <ThemeSwitcher setIsDark={setIsDark} isDark={isDark} />
        </div>
        <div css={styles.item}>
          <LangList />
        </div>
        {user && (
          <div css={styles.item} onClick={onLogout}>
            <img src={LogoutIcon} css={styles.loginIcon} />
          </div>
        )}
        {!user && (
          <Link to={ROUTES.login} css={styles.item}>
            {!isDark && <img src={LoginIcon} css={styles.loginIcon} />}
            {isDark && <img src={LoginWhiteIcon} css={styles.loginIcon} />}
          </Link>
        )}
      </div>
      <ModalDialog isOpen={isInvoiceModalOpen} onClose={toggleInvoiceModal}>
        {width >= INVOICE_PREVIEW_SUPPORTED_RESOLUTION && (
          <div id="report" css={styles.report}>
            <Invoice />
          </div>
        )}
        {width < INVOICE_PREVIEW_SUPPORTED_RESOLUTION && (
          <span css={styles.noPreviewMessage}>
            {t("noPreviewSupportedMessage")}
          </span>
        )}
      </ModalDialog>
    </header>
  );
}

Header.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};

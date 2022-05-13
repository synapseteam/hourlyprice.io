/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import ModalDialog from "components/ModalDialog";
import ActOfWorkDoc from "../../components/ActOfWorkDoc/index";
import Footer from "../../components/Footer";
import { useLocalStorage } from "../../hooks";
import { useEffect, useState } from "react";
import ClientForm from "components/ClientForm";
import Button from "components/UI/Button";
import { styles } from "./styles";
import SideMenu from "../../components/SideMenu";

export default function ActOfWorkPage({ isDark }) {
  const [actOfWork, setActOfWork] = useLocalStorage("actOfWorkDocs", []);
  const [selectedAct, setSelectedAct] = useState(null);
  const [isActUpdated, setIsActUpdated] = useState(false);
  const [isActAdded, setIsActAdded] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    if (isActUpdated) {
      setTimeout(() => {
        setIsActUpdated(false);
      }, 1800);
    }
  }, [isActUpdated]);

  useEffect(() => {
    if (isActAdded) {
      setTimeout(() => {
        setIsActAdded(false);
      }, 1800);
    }
  }, [isActAdded]);

  const setSelectedActDoc = (docName) => {
    const selectedActOfWork = actOfWork.find(
      (item) => item.docName === docName
    );
    setSelectedAct(selectedActOfWork);
  };
  const closeModal = () => {
    setModalType("");
  };
  return (
    <div css={styles.ActOfWorkPage}>
      <Button onClick={() => setModalType("client")} type="button">
        open
      </Button>
      <ModalDialog isOpen={modalType} onClose={closeModal}>
        <ClientForm />
      </ModalDialog>
      <HeaderActOfWork
        isDark={isDark}
        actOfWork={actOfWork}
        setSelectedAct={setSelectedAct}
        setSelectedActDoc={setSelectedActDoc}
        isActUpdated={isActUpdated}
        isActAdded={isActAdded}
      />
      <div css={styles.contentContainer}>
        <SideMenu />
        <ActOfWorkDoc
          actOfWork={actOfWork}
          selectedAct={selectedAct}
          setActOfWork={setActOfWork}
          setIsActUpdated={setIsActUpdated}
          setIsActAdded={setIsActAdded}
        />
      </div>
      <div css={styles.noPreviewMessage}>
        Попередній перегляд не підтримується
      </div>
      <Footer
        companyName="Synapse Team LLC"
        companyUrl="https://synapseteam.com"
      />
    </div>
  );
}

ActOfWorkPage.propTypes = {
  isDark: PropTypes.bool,
};

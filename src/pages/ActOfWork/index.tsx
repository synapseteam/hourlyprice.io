/** @jsxImportSource @emotion/react */
import { FC, Dispatch, SetStateAction } from "react";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import ModalDialog from "components/ModalDialog";
import ActOfWorkDoc from "../../components/ActOfWorkDoc/index";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import ClientForm from "components/ClientForm";
import SideMenu from "../../components/SideMenu";
import { styles } from "./styles";

interface IProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const ActOfWorkPage: FC<IProps> = ({ isDark }): JSX.Element => {
  const [isActUpdated, setIsActUpdated] = useState(false);
  const [isActAdded, setIsActAdded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedFields, setSelectedFields] = useState();

  useEffect(() => {
    if (modalType) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalType]);

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

  const closeModal = () => {
    setIsOpenModal(false);
    setModalType("");
  };
  return (
    <div css={styles.ActOfWorkPage}>
      <ModalDialog isOpen={isOpenModal} onClose={closeModal}>
        {modalType === "clientModal" && (
          <ClientForm type={modalType} selectedFields={selectedFields} />
        )}
        {modalType === "executorModal" && <ClientForm type={modalType} />}
      </ModalDialog>
      <HeaderActOfWork
        isDark={isDark}
        isActUpdated={isActUpdated}
        isActAdded={isActAdded}
        isBillUpdated={false}
        isBillAdded={false}
      />
      <div css={styles.contentContainer}>
        <SideMenu
          setIsOpenModal={setIsOpenModal}
          setModalType={setModalType}
          isDark={isDark}
          setSelectedFields={setSelectedFields}
          setSelectedUser={setSelectedUser}
        />
        <ActOfWorkDoc selectedUser={selectedUser} isDark={false} />
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
};

export default ActOfWorkPage;

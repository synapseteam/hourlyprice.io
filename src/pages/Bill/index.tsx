/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import HeaderActOfWork from "../../components/HeaderActOfWork/index";
import Footer from "../../components/Footer";
import BillDoc from "../../components/BillDoc";
import SideMenu from "../../components/SideMenu";
import ModalDialog from "components/ModalDialog";
import ClientForm from "components/ClientForm";
import { styles } from "./styles";
import { IActInfoUser } from "typescript/interfaces";

interface IProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const BillPage: FC<IProps> = ({ isDark }): JSX.Element => {
  const [isBillUpdated, setIsBillUpdated] = useState(false);
  const [isBillAdded, setIsBillAdded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState<IActInfoUser>();
  const [selectedFields, setSelectedFields] = useState<IActInfoUser>();
  useEffect(() => {
    if (modalType) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalType]);

  useEffect(() => {
    if (isBillUpdated) {
      setTimeout(() => {
        setIsBillUpdated(false);
      }, 1800);
    }
  }, [isBillUpdated]);

  useEffect(() => {
    if (isBillAdded) {
      setTimeout(() => {
        setIsBillAdded(false);
      }, 1800);
    }
  }, [isBillAdded]);

  const closeModal = () => {
    setIsOpenModal(false);
    setModalType("");
  };

  return (
    <div css={styles.BillDoc}>
      <ModalDialog isOpen={isOpenModal} onClose={closeModal}>
        {modalType === "clientModal" && (
          <ClientForm type={modalType} selectedFields={selectedFields} />
        )}
        {modalType === "executorModal" && <ClientForm type={modalType} />}
      </ModalDialog>
      <HeaderActOfWork
        isDark={isDark}
        isBillAdded={isBillAdded}
        isBillUpdated={isBillUpdated}
        isActUpdated={false}
        isActAdded={false}
      />
      <div css={styles.contentContainer}>
        <SideMenu
          setIsOpenModal={setIsOpenModal}
          setModalType={setModalType}
          isDark={isDark}
          setSelectedUser={setSelectedUser}
          setSelectedFields={setSelectedFields}
        />
        <BillDoc isDark={isDark} selectedUser={selectedUser} />
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

export default BillPage;

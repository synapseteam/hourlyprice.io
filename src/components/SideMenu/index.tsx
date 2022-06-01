/** @jsxImportSource @emotion/react */
import { Dispatch, FC, SetStateAction, useState } from "react";
import Accordion from "../Accordion";
import Button from "components/UI/Button";
import SideMenuItem from "./SideMenuItem";
import UsersArr from "mock/users.json";
import { styles } from "./styles";

interface Props {
  setModalType: Dispatch<SetStateAction<string>>;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedFields: any; // TODO check any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedUser: any; // TODO check any
}
const SideMenu: FC<Props> = ({
  setIsOpenModal,
  setModalType,
  isDark,
  setSelectedFields,
  setSelectedUser,
}) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const onOpenModal = (item: Record<string | number, string | number>) => {
    setSelectedFields(item);
    setModalType("clientModal");
  };

  const onAddUser = (modalType: string) => {
    setSelectedFields(undefined);
    setIsOpenModal(true);
    modalType === "clientModal"
      ? setModalType("clientModal")
      : setModalType("executorModal");
  };

  return (
    <div css={styles.SideMenu}>
      <Accordion
        isOpen={isOpen1}
        onToggle={() => setIsOpen1((s) => !s)}
        heading="Замовник"
        transitionDuration={400}
      >
        <Button
          disabled={false}
          onClick={() => onAddUser("clientModal")}
          classname={styles.addButton}
          classnameContainer={styles.addButtonContainer}
        >
          <span>Додати</span>
        </Button>
        <ul css={styles.list}>
          {UsersArr &&
            UsersArr.map((item) => (
              <li key={item.id}>
                <SideMenuItem
                  isDark={isDark}
                  name={item.name}
                  surname={item.surname}
                  patronym={item.patronym}
                  onClick={() => setSelectedUser(item)}
                  toggleModal={() => onOpenModal(item)}
                />
              </li>
            ))}
        </ul>
      </Accordion>
      <Accordion
        isOpen={isOpen2}
        onToggle={() => setIsOpen2((s) => !s)}
        heading="Виконавець"
        transitionDuration={400}
      >
        <Button
          disabled={false}
          onClick={() => onAddUser("executorModal")}
          classname={styles.addButton}
          classnameContainer={styles.addButtonContainer}
        >
          <span>Додати</span>
        </Button>
        <ul css={styles.list}>
          {UsersArr &&
            UsersArr.map((item) => (
              <li key={item.id}>
                <SideMenuItem
                  isDark={isDark}
                  name={item.name}
                  surname={item.surname}
                  patronym={item.patronym}
                  toggleModal={() => setModalType("executorModal")}
                  onClick={() => setSelectedUser(item)}
                />
              </li>
            ))}
        </ul>
      </Accordion>
      <Accordion
        isOpen={isOpen3}
        onToggle={() => setIsOpen3((s) => !s)}
        heading="Всі документи"
        transitionDuration={400}
      />
    </div>
  );
};

export default SideMenu;

/** @jsxImportSource @emotion/react */
import { Dispatch, FC, SetStateAction, useState } from "react";
import Accordion from "../Accordion";
import Button from "components/UI/Button";
import SideMenuItem from "./SideMenuItem";
import UsersArr from "mock/users.json";
import { styles } from "./styles";

interface Props {
  setModalType: Dispatch<SetStateAction<string>>;
  isDark: boolean;
  setSelectedFields: any;
  setSelectedUser: any;
}
const SideMenu: FC<Props> = ({
  setModalType,
  isDark,
  setSelectedFields,
  setSelectedUser,
}) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const onOpenModal = (item: Record<any, any>) => {
    setSelectedFields(item);
    setModalType("clientModal");
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
          onClick={() => setModalType("clientModal")}
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
          onClick={() => setModalType("executorModal")}
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

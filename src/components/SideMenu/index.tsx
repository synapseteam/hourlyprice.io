/** @jsxImportSource @emotion/react */
import { Dispatch, FC, SetStateAction, useState } from "react";
import Accordion from "../Accordion";
import Button from "components/UI/Button";
import { styles } from "./styles";

interface Props {
  setModalType: Dispatch<SetStateAction<string>>;
}
const SideMenu: FC<Props> = ({ setModalType }) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

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

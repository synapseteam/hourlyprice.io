/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { styles } from "./styles";
import Accordion from "../Accordion";
import Button from "components/UI/Button";

const SideMenu: FC = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const toggleModal = () => {
    console.log("modal open");
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
          onClick={toggleModal}
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
          onClick={toggleModal}
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

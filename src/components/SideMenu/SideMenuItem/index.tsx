/** @jsxImportSource @emotion/react */
import { FC, MouseEventHandler } from "react";
import Button from "components/UI/Button";
import EditIcon from "assets/edit-icon.png";
import EditIconWhite from "assets/edit-icon-white.png";
import { styles } from "./styles";

interface ISideMenuItem {
  toggleModal?: MouseEventHandler<HTMLButtonElement>;
  isDark: boolean;
}

const SideMenuItem: FC<ISideMenuItem> = ({ toggleModal, isDark }) => {
  return (
    <div css={styles.SideMenuItem}>
      <Button
        type="button"
        classname={styles.button}
        classnameContainer={styles.buttonContainer}
      >
        <span css={styles.buttonText}>Surname S.P.</span>
      </Button>
      <Button
        type="button"
        onClick={toggleModal}
        classnameContainer={styles.buttonContainerImg}
        classname={styles.buttonImg}
      >
        {isDark ? (
          <img src={EditIconWhite} css={styles.editIcon} />
        ) : (
          <img src={EditIcon} css={styles.editIcon} />
        )}
      </Button>
    </div>
  );
};

export default SideMenuItem;

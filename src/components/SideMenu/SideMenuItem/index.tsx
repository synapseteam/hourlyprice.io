/** @jsxImportSource @emotion/react */
import { FC, MouseEventHandler } from "react";
import Button from "components/UI/Button";
import EditIcon from "assets/edit-icon.png";
import EditIconWhite from "assets/edit-icon-white.png";
import { styles } from "./styles";

interface ISideMenuItem {
  toggleModal?: MouseEventHandler<HTMLButtonElement>;
  isDark: boolean;
  surname: string;
  name: string;
  patronym: string;
}

const SideMenuItem: FC<ISideMenuItem> = ({
  toggleModal,
  isDark,
  surname,
  name,
  patronym,
}) => {
  return (
    <div css={styles.SideMenuItem}>
      <Button
        type="button"
        classname={styles.button}
        classnameContainer={styles.buttonContainer}
      >
        <span css={styles.buttonText}>
          {`${surname} ${name.charAt(0).toUpperCase()}.
          ${patronym.charAt(0).toUpperCase()}.`}
        </span>
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

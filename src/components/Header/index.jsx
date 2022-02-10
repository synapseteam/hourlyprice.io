/** @jsxImportSource @emotion/react */
import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";

import { styles } from "./styles";

export default function Header({ setIsDark }) {
  return (
    <header css={styles.header}>
      <Logo />
      <div css={styles.rightHandContainer}>
        <LangList />
        <ThemeSwitcher setIsDark={setIsDark} />
      </div>
    </header>
  );
}

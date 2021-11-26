/** @jsxImportSource @emotion/react */
import React from "react";

import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import { useAppThemeContext } from "context/AppContext";

import { styles } from "./styles";

export default function Header() {
  const [{ darkMode }] = useAppThemeContext();

  return (
    <header css={() => styles.getStyle(darkMode, "header")}>
      <Logo />
      <div css={() => styles.getStyle(darkMode, "rightHandContainer")}>
        <LangList />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

import React from "react";

import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import { useAppThemeContext } from "context/AppContext";

import "components/Header/styles.scss";

export default function Header() {
  const [context] = useAppThemeContext();

  return (
    <header className={context.darkMode ? "header" : "header header_light"}>
      <Logo />
      <div className="header__right-side-cont">
        <LangList />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

import React from "react";
import { Icon } from "@iconify/react";

import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import { useAppThemeContext } from "context/AppContext";

import "components/Header/styles.scss";

export default function Header() {
  const [state] = useAppThemeContext();

  return (
    <header className={!state.darkMode ? "light-header" : ""}>
      <Logo />
      <div className="header-right-side-cont">
        <LangList />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

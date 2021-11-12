import React from "react";
import { Icon } from "@iconify/react";

import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import { useAppThemeContext } from "context/AppContext";

import "components/Header/styles.scss";

export default function Header() {
  const [state] = useAppThemeContext();

  console.log(state);
  return (
    <header className={!state.darkMode ? "light-header" : ""}>
      <Logo />
      <div className="header-right-side-cont">
        <ThemeSwitcher />
        <Icon icon="ci:menu-duo" className="big-icon" />
      </div>
    </header>
  );
}

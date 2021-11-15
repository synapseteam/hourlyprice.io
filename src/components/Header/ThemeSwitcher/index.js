import React from "react";
import { Icon } from "@iconify/react";

import { useAppThemeContext, toggleTheme } from "context/AppContext";

export default function ThemeSwitcher() {
  const [state, dispatch] = useAppThemeContext();

  function handleThemeSwitcherClick() {
    dispatch(toggleTheme());
  }

  return (
    <>
      {state.darkMode ? (
        <Icon
          icon="emojione:light-bulb"
          className="theme-switch-icon"
          onClick={handleThemeSwitcherClick}
        />
      ) : (
        <Icon
          icon="emojione-monotone:light-bulb"
          className="theme-switch-icon"
          onClick={handleThemeSwitcherClick}
        />
      )}
    </>
  );
}

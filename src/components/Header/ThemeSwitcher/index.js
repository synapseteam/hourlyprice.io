/** @jsxImportSource @emotion/react */
import React from "react";
import { Icon } from "@iconify/react";

import { useAppThemeContext, toggleTheme } from "context/AppContext";

import { styles } from "./styles";

export default function ThemeSwitcher() {
  const [context, dispatch] = useAppThemeContext();

  function handleThemeSwitcherClick() {
    dispatch(toggleTheme());
  }

  return (
    <>
      {context.darkMode ? (
        <Icon
          css={() => styles.getStyle(null, "icon")}
          icon="emojione:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      ) : (
        <Icon
          css={() => styles.getStyle(null, "icon")}
          icon="emojione-monotone:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      )}
    </>
  );
}

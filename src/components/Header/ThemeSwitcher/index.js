/** @jsxImportSource @emotion/react */
import React from "react";
import { Icon } from "@iconify/react";

import { useAppThemeContext, toggleTheme } from "context/AppContext";

import { styles } from "./styles";

export default function ThemeSwitcher({ setIsDark }) {
  const [context, dispatch] = useAppThemeContext();

  function handleThemeSwitcherClick() {
    dispatch(toggleTheme());
    setIsDark((prev) => !prev);
  }

  return (
    <>
      {context.darkMode ? (
        <Icon
          css={styles.icon}
          icon="emojione:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      ) : (
        <Icon
          css={styles.icon}
          icon="emojione-monotone:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      )}
    </>
  );
}

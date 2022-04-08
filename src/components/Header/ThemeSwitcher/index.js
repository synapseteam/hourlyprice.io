/** @jsxImportSource @emotion/react */
import { Icon } from "@iconify/react";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function ThemeSwitcher({ setIsDark, isDark }) {
  const theme = useTheme();

  function handleThemeSwitcherClick() {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  }

  return (
    <>
      {theme.name === "dark" ? (
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

ThemeSwitcher.propTypes = {
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};

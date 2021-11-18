import React from "react";
import { Icon } from "@iconify/react";
import styled from "@emotion/styled";

import { useAppThemeContext, toggleTheme } from "context/AppContext";

const StyledIcon = styled(Icon)`
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function ThemeSwitcher() {
  const [context, dispatch] = useAppThemeContext();

  function handleThemeSwitcherClick() {
    dispatch(toggleTheme());
  }

  return (
    <>
      {context.darkMode ? (
        <StyledIcon
          icon="emojione:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      ) : (
        <StyledIcon
          icon="emojione-monotone:light-bulb"
          onClick={handleThemeSwitcherClick}
        />
      )}
    </>
  );
}

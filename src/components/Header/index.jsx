import React from "react";
import styled from "@emotion/styled";

import Logo from "components/Header/Logo";
import ThemeSwitcher from "components/Header/ThemeSwitcher";
import LangList from "components/Header/LangList";
import { useAppThemeContext } from "context/AppContext";

import {
  lightPurple,
  white,
  lightGrey,
} from "components/shared/sharedStylesEmotion/colors";

const StyledHeader = styled.header`
  background-color: ${({ darkMode }) => (darkMode ? lightPurple : white)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  ${({ darkMode }) => !darkMode && "box-shadow: 0 1px 3px" + lightGrey}
`;

const StyledRightHandPanel = styled.div`
  position: relative;
`;

export default function Header() {
  const [{ darkMode }] = useAppThemeContext();

  return (
    <StyledHeader className="header" darkMode={darkMode}>
      <Logo />
      <StyledRightHandPanel>
        <LangList />
        <ThemeSwitcher />
      </StyledRightHandPanel>
    </StyledHeader>
  );
}

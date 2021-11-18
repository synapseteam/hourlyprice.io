import React, { useState } from "react";
import uniqid from "uniqid";
import { changeLanguage } from "i18n";
import styled from "@emotion/styled";

import { useAppThemeContext } from "context/AppContext";

import {
  purple,
  darkPurple,
  darkGrey,
  white,
  brightGrey,
} from "components/shared/sharedStylesEmotion/colors";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: -200%;
  background-color: ${({ darkMode }) => (darkMode ? purple : brightGrey)};
  border: 1px solid ${darkPurple};
  border: ${({ darkMode }) => !darkMode && "none"};
  border-radius: 0.4rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  margin: 0;
`;

const StyledListItem = styled.li`
  list-style: none;
  padding: 0.3rem;
`;

const StyledListLink = styled.a`
  text-decoration: none;
  color: ${({ darkMode }) => (darkMode ? white : darkGrey)};
`;

export default function LangList() {
  const [isListShown, setisListShown] = useState(false);
  const [chosenLang, setChosenLang] = useState("EN");

  const [{ darkMode }] = useAppThemeContext();

  const langChangeHandler = (e) => {
    e.preventDefault();

    if (!isListShown) {
      setisListShown((prev) => true);
    }

    if (isListShown) {
      const value = e.target.innerText.toLowerCase();
      changeLanguage(value);
      setisListShown((prev) => false);
      setChosenLang((prev) => value.toUpperCase());
    }
  };

  const locales = ["en", "ru", "ua"];

  return (
    <StyledContainer darkMode={darkMode}>
      <StyledList>
        {isListShown ? (
          locales.map((el) => {
            return (
              <StyledListItem key={uniqid()}>
                <StyledListLink
                  darkMode={darkMode}
                  href="/"
                  onClick={langChangeHandler}
                >
                  {el.toUpperCase()}
                </StyledListLink>
              </StyledListItem>
            );
          })
        ) : (
          <StyledListItem>
            <StyledListLink
              darkMode={darkMode}
              href="/"
              onClick={langChangeHandler}
            >
              {chosenLang}
            </StyledListLink>
          </StyledListItem>
        )}
      </StyledList>
    </StyledContainer>
  );
}

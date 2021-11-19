import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { useAppThemeContext } from "context/AppContext";
import { useCustomTranslation } from "i18n";

const green = "#174f5e";
const lightgreen = "#5cbabc";
const white = "#ffffff";
const lightGrey = "#e5e5e5";
const black = "#000000";
const darkGrey = "#d5d3d3";

const StyledButtonContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const StyledButton = styled.button`
  border: ${({ darkMode }) => (darkMode ? "1px solid " + lightgreen : "none")};
  border-radius: 0.5rem;
  background-color: ${({ darkMode }) => (darkMode ? green : lightGrey)};
  width: 100%;
  color: ${({ darkMode }) => (darkMode ? white : black)};
  padding: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? lightgreen : darkGrey)};
  }
`;

export default function ButtonSubmit({ formId }) {
  const [{ darkMode }] = useAppThemeContext();
  const [t] = useCustomTranslation();

  const additionalProps = formId
    ? {
        form: formId,
      }
    : null;

  return (
    <StyledButtonContainer className="button__container">
      <StyledButton darkMode={darkMode} {...additionalProps} className="button">
        {t("btnResult").toUpperCase()}
      </StyledButton>
    </StyledButtonContainer>
  );
}

ButtonSubmit.propTypes = {
  formId: PropTypes.string,
};

import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { useAppThemeContext } from "context/AppContext";

import {
  lightPurple,
  purple,
  white,
  darkGrey,
} from "components/shared/sharedStylesEmotion/colors.js";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${lightPurple};
  border: ${({ darkMode }) => !darkMode && "none"};
  padding: 0.6rem;
  background-color: ${({ darkMode }) => (darkMode ? purple : white)};
  ${({ darkMode }) => !darkMode && "box-shadow: -1px -1px 3px #ddd;"};
`;

const StyledFooterText = styled.p`
  font-weight: 500;
  font-size: 0.9rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ darkMode }) => (darkMode ? white : darkGrey)};
`;

export default function Footer({ companyName, companyUrl }) {
  const currentYear = new Date().getFullYear();

  const [{ darkMode }] = useAppThemeContext();

  return (
    <StyledFooter darkMode={darkMode}>
      <StyledFooterText>
        <StyledLink
          href={companyUrl}
          target="_blank"
          rel="noreferrer"
          darkMode={darkMode}
        >{`© ${companyName}, ${currentYear}`}</StyledLink>
      </StyledFooterText>
    </StyledFooter>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  companyUrl: PropTypes.string,
};

Footer.defaultProps = {
  companyName: "Synapse Team LLC",
  companyUrl: "https://synapseteam.com",
};

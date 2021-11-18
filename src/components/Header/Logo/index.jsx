import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";

import { darkGrey } from "components/shared/sharedStylesEmotion/colors";

const StyledLogo = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 0.6;
  cursor: pointer;
  ${({ darkMode }) => !darkMode && "color:" + darkGrey}
`;

export default function Logo({ logoText }) {
  const [{ darkMode }] = useAppThemeContext();
  return (
    <>
      <StyledLogo darkMode={darkMode}>{logoText}</StyledLogo>
    </>
  );
}

Logo.propTypes = {
  logoText: PropTypes.string,
};

Logo.defaultProps = {
  logoText: "hourlyprice.io",
};

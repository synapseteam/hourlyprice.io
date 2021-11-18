import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { useCustomTranslation } from "i18n";
import Loader from "components/shared/Loader";

import {
  lightPurple,
  blue,
  darkGrey,
} from "components/shared/sharedStylesEmotion/colors.js";

const StyledTitle = styled.h2`
  margin: 0;
`;
const StyledContainer = styled.div`
  border-bottom: 1px solid lighten(${lightPurple}, 15);
  min-height: 6.8rem;
`;

const StyledSum = styled.p`
  color: ${({ darkMode }) => (darkMode ? blue : darkGrey)};
  font-weight: 700;
  line-height: 0.7;
  padding: 2.4rem 1rem;
  margin: 0;
  font-size: 3rem;
`;

export default function MainCurrencyDisplay({
  sum,
  currency,
  isLoading,
  darkMode,
}) {
  const [t] = useCustomTranslation();
  return (
    <>
      <StyledTitle>{t("totalPrice")}</StyledTitle>
      <StyledContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <StyledSum darkMode={darkMode}>{`${sum}${currency}`}</StyledSum>
        )}
      </StyledContainer>
    </>
  );
}

MainCurrencyDisplay.propTypes = {
  sum: PropTypes.string,
  currency: PropTypes.string,
  isLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
};

MainCurrencyDisplay.defaultProps = {
  sum: 0.0,
  currency: "USD",
  isLoading: false,
  darkMode: true,
};

import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import {
  blue,
  darkGrey,
} from "components/shared/sharedStylesEmotion/colors.js";

const StyledSubCurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSubCurrencyTitlte = styled.div`
  color: ${({ darkMode }) => (darkMode ? blue : darkGrey)};
  font-size: 0.8rem;
`;

const StyledSubCurrencySum = styled.div`
  margin-top: 0.4rem;
  font-weight: 700;
`;

export default function SubCurrency({ name, value, darkMode }) {
  return (
    <StyledSubCurrencyContainer>
      <StyledSubCurrencyTitlte darkMode={darkMode}>
        {name}
      </StyledSubCurrencyTitlte>
      <StyledSubCurrencySum>{value}</StyledSubCurrencySum>
    </StyledSubCurrencyContainer>
  );
}

SubCurrency.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  darkMode: PropTypes.bool,
};

SubCurrency.defaultProps = {
  name: "USD",
  value: "0.00",
  darkMode: true,
};

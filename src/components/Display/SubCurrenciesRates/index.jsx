import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import {
  mediumGrey,
  darkPurple,
  blue,
  darkGrey,
} from "components/shared/sharedStylesEmotion/colors.js";

const StyledRatesContainer = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? darkPurple : mediumGrey)};
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  border-radius: 0 0 0.4rem 0.4rem;
  bottom: 0;
`;

const StyledRateText = styled.p`
  font-size: 0.8rem;
  line-height: 0.5;
`;

const StyledRatesDelimiter = styled.span`
  color: ${({ darkMode }) => (darkMode ? blue : darkGrey)};
  margin: 0 0.6rem;
`;

export default function SubCurrenciesRatesDisplay({
  allCurrencies,
  currency,
  darkMode,
}) {
  const basicRate = allCurrencies.find((el) => el.name === currency)?.rate;

  const subCurrenciesRatesArr = allCurrencies
    .filter((el) => el.name !== currency && el.rate !== "")
    .map((el) => ({
      symbol: el.symbol,
      crossRate: (el.rate / basicRate).toFixed(4),
    }));

  const lastElIndex = subCurrenciesRatesArr.length - 1;
  return (
    <StyledRatesContainer darkMode={darkMode}>
      {subCurrenciesRatesArr.map((el, i) => {
        return (
          <StyledRateText key={uniqid()}>
            {`${el.symbol}${el.crossRate}`}
            {i !== lastElIndex && (
              <StyledRatesDelimiter darkMode={darkMode}>/</StyledRatesDelimiter>
            )}
          </StyledRateText>
        );
      })}
    </StyledRatesContainer>
  );
}

SubCurrenciesRatesDisplay.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.string,
  darkMode: PropTypes.bool,
};

SubCurrenciesRatesDisplay.defaultProps = {
  darkMode: true,
};

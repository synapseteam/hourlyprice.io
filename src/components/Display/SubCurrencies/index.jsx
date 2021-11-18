import React from "react";
import PropTypes from "prop-types";
import uniqid from "uniqid";
import styled from "@emotion/styled";

import SubCurrency from "components/Display/SubCurrencies/SubCurrency";
import Loader from "components/shared/Loader";

const StyledContainer = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 1rem;
  min-height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default function SubCurrenciesDisplay({
  subCurrenciesArr,
  isLoading,
  darkMode,
}) {
  return (
    <StyledContainer>
      {isLoading ? (
        <Loader />
      ) : (
        subCurrenciesArr.map((el) => (
          <SubCurrency
            name={el.name}
            value={el.value || 0}
            key={uniqid()}
            darkMode={darkMode}
          />
        ))
      )}
    </StyledContainer>
  );
}

SubCurrenciesDisplay.propTypes = {
  subCurrenciesArr: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
};

SubCurrenciesDisplay.defaultProps = {
  subCurrenciesArr: [
    { name: "EUR", value: "0.00" },
    { name: "UAH", value: "0.00" },
    { name: "RUB", value: "0.00" },
  ],
  darkMode: true,
};

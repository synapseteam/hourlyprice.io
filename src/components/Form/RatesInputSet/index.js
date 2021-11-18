import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { handlePriceChange } from "utils";
import { StyledInput } from "components/shared/sharedStylesEmotion/StyledInput";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledRatesInput = styled(StyledInput)`
  width: 22%;
  margin-top: 1.6rem;
`;

export default function RatesInputSet({
  register,
  chosenCurrency,
  allCurrencies,
  errors,
  darkMode,
}) {
  const allCurrenciesNames = allCurrencies.map((el) => ({ name: el.name }));

  return (
    <StyledContainer>
      {allCurrenciesNames.map(({ name }) => {
        return (
          <StyledRatesInput
            darkMode={darkMode}
            {...register(name)}
            key={uniqid()}
            inputMode="decimal"
            type="text"
            autoComplete="off"
            placeholder={name}
            onChange={handlePriceChange}
          />
        );
      })}
    </StyledContainer>
  );
}

RatesInputSet.propTypes = {
  register: PropTypes.func.isRequired,
  chosenCurrency: PropTypes.string.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  erorrs: PropTypes.object,
};

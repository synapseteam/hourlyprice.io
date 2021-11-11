import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { handlePriceChange } from "utils";

import "components/Form/RatesInputSet/styles.scss";

export default function RatesInputSet({
  register,
  chosenCurrency,
  allCurrencies,
  errors,
}) {
  const allCurrenciesNames = allCurrencies.map((el) => ({
    ...el,
    basic: el.name === chosenCurrency,
  }));

  return (
    <div className="rates-input-set">
      {allCurrenciesNames.map((el) => {
        return (
          <input
            {...register(el.name)}
            key={uniqid()}
            className="rates-input"
            type="text"
            autoComplete="off"
            placeholder={el.name}
            onChange={handlePriceChange}
          />
        );
      })}
    </div>
  );
}

RatesInputSet.propTypes = {
  register: PropTypes.func.isRequired,
  chosenCurrency: PropTypes.string.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  erorrs: PropTypes.object,
};

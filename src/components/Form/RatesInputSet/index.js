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
  const allCurrenciesNames = allCurrencies.map((el) => ({ name: el.name }));

  return (
    <div className="rates-input-set">
      {allCurrenciesNames.map(({ name }) => {
        return (
          <input
            {...register(name)}
            key={uniqid()}
            className="rates-input"
            type="text"
            autoComplete="off"
            placeholder={name}
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

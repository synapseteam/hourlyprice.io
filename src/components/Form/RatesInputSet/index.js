import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";

import "components/Form/RatesInputSet/styles.scss";

export default function RatesInputSet({ register, chosenCurrency }) {
  const allCurrenciesArr = useSelector((state) => state.rates.allCurrencies);

  const allCurrenciesNames = allCurrenciesArr.map((el) => ({
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
          />
        );
      })}
    </div>
  );
}

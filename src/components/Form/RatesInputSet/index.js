import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";

import "components/Form/RatesInputSet/styles.scss";

export default function RatesInputSet({ register, chosenCurrency }) {
  const allCurrenciesArr = useSelector((state) => state.rates.allCurrencies);

  console.log("all currencies not filtered", allCurrenciesArr);

  const allCurrenciesNames = allCurrenciesArr.map((el) => ({
    ...el,
    basic: el.name === chosenCurrency,
  }));

  console.log({ allCurrenciesNames, chosenCurrency });

  return (
    <div className="rates-input-set">
      {allCurrenciesNames.map((el) => {
        console.log(el, chosenCurrency);
        return (
          <input
            {...register(el.name)}
            key={uniqid()}
            className="rates-input"
            type="text"
            value={el.basic ? 1 : ""}
            autoComplete="off"
            placeholder={el.name}
          />
        );
      })}
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";

import SubCurrenciesDisplay from "components/Display/SubCurrenciesDisplay";
import MainCurrencyDisplay from "components/Display/MainCurrencyDisplay";

import "components/Display/styles.scss";

export default function Display() {
  const { price, time, currency } = useSelector((state) => state.main.fields);

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);

  const isLoading = useSelector((state) => state.main.isLoading);

  const isRequestError = useSelector((state) => state.main.ratesRequestErr);

  const mainCurrencyData = allCurrencies.find((el) => el.name === currency) || {
    name: "",
    price: 0,
    symbol: "",
  };

  function generateSubCurrenciesArr(arr, basicRate) {
    const subCurrencyInitial = arr.filter((el) => el.name !== currency);
    if (!currency) {
      return subCurrencyInitial.map((el) => {
        return {
          ...el,
          value: 0,
        };
      });
    }
    return subCurrencyInitial.map((el) => {
      return {
        name: el.name,
        value: (el.rate * basicRate * time).toFixed(2),
      };
    });
  }

  const basicRate = price / mainCurrencyData.rate;

  const mainCurrencySum = Number((time * price).toFixed(2));

  const subCurrenciesArr = generateSubCurrenciesArr(allCurrencies, basicRate);

  return (
    <div className="display">
      {isRequestError && (
        <p>Request Failed. Rates was not update properly 🤪</p>
      )}
      <MainCurrencyDisplay
        currency={mainCurrencyData.symbol}
        sum={mainCurrencySum}
        isLoading={isLoading}
      />
      <SubCurrenciesDisplay
        subCurrenciesArr={subCurrenciesArr}
        isLoading={isLoading}
      />
    </div>
  );
}

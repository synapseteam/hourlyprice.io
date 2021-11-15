import React from "react";
import { useSelector } from "react-redux";

import SubCurrenciesDisplay from "components/Display/SubCurrenciesDisplay";
import MainCurrencyDisplay from "components/Display/MainCurrencyDisplay";
import SubCurrenciesRatesDisplay from "components/Display/SubCurrenciesRatesDisplay";
import { useAppThemeContext } from "context/AppContext";

import "components/Display/styles.scss";

export default function Display() {
  const { price, time, currency } = useSelector((state) => state.main.fields);

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);

  const isLoading = useSelector((state) => state.main.isLoading);

  const isRequestError = useSelector((state) => state.main.ratesRequestErr);

  const [state] = useAppThemeContext();

  const mainCurrencyData = allCurrencies.find((el) => el.name === currency) || {
    name: "",
    price: 0,
    symbol: "",
  };

  function formatSum(num) {
    return new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: 2,
    })
      .format(num)
      .replace(".", " ");
  }

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
        value: el.rate ? formatSum(el.rate * basicRate * time) : "--",
      };
    });
  }

  const basicRate = price / mainCurrencyData.rate;

  const mainCurrencySum = formatSum(time * price);

  const subCurrenciesArr = generateSubCurrenciesArr(allCurrencies, basicRate);

  return (
    <div className={state.darkMode ? "display" : "display light-display"}>
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
      <SubCurrenciesRatesDisplay
        allCurrencies={allCurrencies}
        currency={currency}
      />
    </div>
  );
}

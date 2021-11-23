/** @jsxImportSource @emotion/react */
import React from "react";
import { useSelector } from "react-redux";

import SubCurrenciesDisplay from "components/Display/SubCurrencies";
import MainCurrencyDisplay from "components/Display/MainCurrency/";
import SubCurrenciesRatesDisplay from "components/Display/SubCurrenciesRates";
import { useAppThemeContext } from "context/AppContext";
import { useCustomTranslation } from "i18n";

import { styles } from "./styles";

export default function Display() {
  const { price, time, currency } = useSelector((state) => state.main.fields);

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);

  const isLoading = useSelector((state) => state.main.isLoading);

  const isRequestError = useSelector((state) => state.main.ratesRequestErr);

  const [context] = useAppThemeContext();

  const [t] = useCustomTranslation();

  const mainCurrencyData = allCurrencies.find((el) => el.name === currency) || {
    name: "",
    price: 0,
    symbol: "",
  };

  function formatSum(num) {
    return new Intl.NumberFormat("de-DE")
      .format(num.toFixed(2))
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

  const darkMode = context.darkMode;

  return (
    <div css={() => styles.getStyle(darkMode, "display")} className="display">
      {isRequestError && <p>{t("badRequestApi")}</p>}
      <MainCurrencyDisplay
        currency={mainCurrencyData.symbol}
        sum={mainCurrencySum}
        isLoading={isLoading}
        darkMode={darkMode}
      />
      <SubCurrenciesDisplay
        subCurrenciesArr={subCurrenciesArr}
        isLoading={isLoading}
        darkMode={darkMode}
      />
      <SubCurrenciesRatesDisplay
        allCurrencies={allCurrencies}
        currency={currency}
        darkMode={darkMode}
      />
    </div>
  );
}

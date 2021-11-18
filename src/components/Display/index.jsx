import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

import SubCurrenciesDisplay from "components/Display/SubCurrencies";
import MainCurrencyDisplay from "components/Display/MainCurrency/MainCurrencyDisplay";
import SubCurrenciesRatesDisplay from "components/Display/SubCurrenciesRates";
import { useAppThemeContext } from "context/AppContext";

import {
  lightPurple,
  brightGrey,
} from "components/shared/sharedStylesEmotion/colors.js";

const mixinShadow = `
-webkit-box-shadow: 0px 18px 23px -3px rgba(0, 0, 0, 0.51);
-moz-box-shadow: 0px 18px 23px -3px rgba(0, 0, 0, 0.51);
box-shadow: 0px 18px 23px -3px rgba(0, 0, 0, 0.51);
`;

const mixinNoShadow = `
-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
`;

const StyledDisplay = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? lightPurple : brightGrey)};
  border-radius: 0.4rem;
  position: relative;
  width: 100%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ darkMode }) => (darkMode ? mixinShadow : mixinNoShadow)};
`;

export default function Display() {
  const { price, time, currency } = useSelector((state) => state.main.fields);

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);

  const isLoading = useSelector((state) => state.main.isLoading);

  const isRequestError = useSelector((state) => state.main.ratesRequestErr);

  const [context] = useAppThemeContext();

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
    <StyledDisplay darkMode={darkMode} className="display">
      {isRequestError && (
        <p>Request Failed. Rates was not update properly 🤪</p>
      )}
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
    </StyledDisplay>
  );
}

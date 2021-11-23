/** @jsxImportSource @emotion/react */
import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function SubCurrenciesRatesDisplay({
  allCurrencies,
  currency,
  darkMode,
}) {
  const basicRate = allCurrencies.find((el) => el.name === currency)?.rate;

  const subCurrenciesRatesArr = allCurrencies
    .filter((el) => el.name !== currency && el.rate !== "")
    .map((el) => ({
      symbol: el.symbol,
      crossRate: (el.rate / basicRate).toFixed(4),
    }));

  const lastElIndex = subCurrenciesRatesArr.length - 1;
  return (
    <div css={() => styles.getStyle(darkMode, "ratesContainer")}>
      {subCurrenciesRatesArr.map((el, i) => {
        return (
          <p css={() => styles.getStyle(darkMode, "rateText")} key={uniqid()}>
            {`${el.symbol}${el.crossRate}`}
            {i !== lastElIndex && (
              <span css={() => styles.getStyle(darkMode, "ratesDelimiter")}>
                /
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
}

SubCurrenciesRatesDisplay.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.string,
  darkMode: PropTypes.bool,
};

SubCurrenciesRatesDisplay.defaultProps = {
  darkMode: true,
};

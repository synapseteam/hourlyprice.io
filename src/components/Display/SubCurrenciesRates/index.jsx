import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import "components/Display/SubCurrenciesRates/styles.scss";

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
    <div
      className={
        darkMode
          ? "sub-currencies-rates-cont"
          : "sub-currencies-rates-cont sub-currencies-rates-cont_light"
      }
    >
      {subCurrenciesRatesArr.map((el, i) => {
        return (
          <p className="sub-currencies-rates-cont__rate" key={uniqid()}>
            {`${el.symbol}${el.crossRate}`}
            {i !== lastElIndex && (
              <span
                className={`sub-currencies-rates-cont__delimiter ${
                  !darkMode ? "sub-currencies-rates-cont__delimiter_light" : ""
                }`}
              >
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

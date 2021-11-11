import React from "react";
import uniqid from "uniqid";

export default function SubCurrenciesRatesDisplay({ allCurrencies, currency }) {
  const basicRate = allCurrencies.find((el) => el.name === currency)?.rate;

  const subCurrenciesRatesArr = allCurrencies
    .filter((el) => el.name !== currency && el.rate !== "")
    .map((el) => ({
      symbol: el.symbol,
      crossRate: (el.rate / basicRate).toFixed(4),
    }));

  const lastElIndex = subCurrenciesRatesArr.length - 1;
  return (
    <div className="display-subcurrencies-rates-cont">
      {subCurrenciesRatesArr.map((el, i) => {
        return (
          <p className="subcurrency-rate" key={uniqid()}>
            {`${el.symbol}${el.crossRate}`}
            {i !== lastElIndex && <span>/</span>}
          </p>
        );
      })}
    </div>
  );
}
import React from "react";
import PropTypes from "prop-types";
import uniqid from "uniqid";

import SubCurrency from "./SubCurrency";
import Loader from "../Loader";

export default function SubCurrenciesDisplay({ subCurrenciesArr, isLoading }) {
  if (isLoading) {
    return (
      <div className="display-currencies-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="display-currencies-container">
      {subCurrenciesArr.map((el) => (
        <SubCurrency name={el.name} value={el.value || 0} key={uniqid()} />
      ))}
    </div>
  );
}

SubCurrenciesDisplay.propTypes = {
  subCurrenciesArr: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
};

SubCurrenciesDisplay.defaultProps = {
  subCurrenciesArr: [
    { name: "EUR", value: "0.00" },
    { name: "UAH", value: "0.00" },
    { name: "RUB", value: "0.00" },
  ],
};

import React from "react";
import PropTypes from "prop-types";
import uniqid from "uniqid";

import SubCurrency from "components/Display/SubCurrencies/SubCurrency";
import Loader from "components/shared/Loader";

import "components/Display/SubCurrencies/styles.scss";

export default function SubCurrenciesDisplay({
  subCurrenciesArr,
  isLoading,
  darkMode,
}) {
  return (
    <div
      className={
        darkMode
          ? "sub-currencies-container"
          : "sub-currencies-container sub-currencies-container_light"
      }
    >
      {isLoading ? (
        <Loader />
      ) : (
        subCurrenciesArr.map((el) => (
          <SubCurrency name={el.name} value={el.value || 0} key={uniqid()} />
        ))
      )}
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
  darkMode: PropTypes.bool,
};

SubCurrenciesDisplay.defaultProps = {
  subCurrenciesArr: [
    { name: "EUR", value: "0.00" },
    { name: "UAH", value: "0.00" },
    { name: "RUB", value: "0.00" },
  ],
  darkMode: true,
};

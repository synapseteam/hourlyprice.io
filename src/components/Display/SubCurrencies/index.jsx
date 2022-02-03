/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";
import uniqid from "uniqid";

import SubCurrency from "components/Display/SubCurrencies/SubCurrency";
import Loader from "components/UI/Loader";

import { styles } from "./styles";

export default function SubCurrenciesDisplay({
  subCurrenciesArr,
  isLoading,
  darkMode,
}) {
  return (
    <div css={() => styles.getStyle(darkMode, "mainContainer")}>
      {isLoading ? (
        <Loader size={46} />
      ) : (
        subCurrenciesArr.map((el) => (
          <SubCurrency
            name={el.name}
            value={el.value || 0}
            key={uniqid()}
            darkMode={darkMode}
          />
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

/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function SubCurrency({ name, value, darkMode }) {
  return (
    <div css={() => styles.getStyle(darkMode, "subCurrencyContainer")}>
      <div css={() => styles.getStyle(darkMode, "subCurrencyTitlte")}>
        {name}
      </div>
      <div css={() => styles.getStyle(darkMode, "subCurrencySum")}>{value}</div>
    </div>
  );
}

SubCurrency.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  darkMode: PropTypes.bool,
};

SubCurrency.defaultProps = {
  name: "USD",
  value: "0.00",
  darkMode: true,
};

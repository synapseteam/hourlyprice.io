import React from "react";
import PropTypes from "prop-types";

export default function SubCurrency({ name, value }) {
  return (
    <div className="sub-currencies-container__sep_currency">
      <div className="sub-currencies-container__sep_currency_type">{name}</div>
      <div className="sub-currencies-container__sep_currency_sum">{value}</div>
    </div>
  );
}

SubCurrency.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

SubCurrency.defaultProps = {
  name: "USD",
  value: "0.00",
};

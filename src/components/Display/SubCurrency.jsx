import React from "react";
import PropTypes from "prop-types";

export default function SubCurrency({ name, value }) {
  return (
    <div className="display-sep-currency">
      <div className="display-sep-currency-type">{name}</div>
      <div className="display-sep-currency-sum">{value}</div>
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

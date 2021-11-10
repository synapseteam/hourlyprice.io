import React from "react";
import PropTypes from "prop-types";

import Loader from "components/Loader";

export default function MainCurrencyDisplay({ sum, currency, isLoading }) {
  return (
    <>
      <h2 className="display-title">Total price</h2>
      <div className="display-sum-container">
        {isLoading ? (
          <Loader />
        ) : (
          <p className="display-sum">{`${sum}${currency}`}</p>
        )}
      </div>
    </>
  );
}

MainCurrencyDisplay.propTypes = {
  sum: PropTypes.string,
  currency: PropTypes.string,
  isLoading: PropTypes.bool,
};

MainCurrencyDisplay.defaultProps = {
  sum: 0.0,
  currency: "USD",
  isLoading: false,
};

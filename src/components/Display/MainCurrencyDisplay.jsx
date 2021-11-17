import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";
import Loader from "components/shared/Loader";

export default function MainCurrencyDisplay({ sum, currency, isLoading }) {
  const [t] = useCustomTranslation();
  return (
    <>
      <h2 className="display-title">{t("totalPrice")}</h2>
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

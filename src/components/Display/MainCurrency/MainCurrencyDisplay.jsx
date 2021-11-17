import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";
import Loader from "components/shared/Loader";

import "components/Display/MainCurrency/styles.scss";

export default function MainCurrencyDisplay({
  sum,
  currency,
  isLoading,
  darkMode,
}) {
  const [t] = useCustomTranslation();
  return (
    <>
      <h2 className="main_currency__title">{t("totalPrice")}</h2>
      <div className="main_currency__sum-container">
        {isLoading ? (
          <Loader />
        ) : (
          <p
            className={
              darkMode
                ? "main_currency__sum"
                : "main_currency__sum main_currency__sum_light"
            }
          >{`${sum}${currency}`}</p>
        )}
      </div>
    </>
  );
}

MainCurrencyDisplay.propTypes = {
  sum: PropTypes.string,
  currency: PropTypes.string,
  isLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
};

MainCurrencyDisplay.defaultProps = {
  sum: 0.0,
  currency: "USD",
  isLoading: false,
  darkMode: true,
};

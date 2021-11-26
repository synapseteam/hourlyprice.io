/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";
import Loader from "components/UI/Loader";

import { styles } from "./styles";

export default function MainCurrencyDisplay({
  sum,
  currency,
  isLoading,
  darkMode,
}) {
  const [t] = useCustomTranslation();
  return (
    <>
      <h2 css={() => styles.getStyle(darkMode, "title")}>{t("totalPrice")}</h2>
      <div css={() => styles.getStyle(darkMode, "mainContainer")}>
        {isLoading ? (
          <Loader />
        ) : (
          <p
            css={() => styles.getStyle(darkMode, "sum")}
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

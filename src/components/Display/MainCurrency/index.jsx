/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";
import SkeletonLoader from "components/UI/SkeleotonLoaders/SkeletonLoader";

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
      <h2 css={styles.title}>{t("totalPrice")}</h2>
      <div css={styles.mainContainer}>
        {isLoading ? (
          <SkeletonLoader size="l" />
        ) : (
          <p css={styles.sum}>{`${sum}${currency}`}</p>
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

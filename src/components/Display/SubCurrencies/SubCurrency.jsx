/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import SkeletonLoader from "components/UI/SkeleotonLoaders/SkeletonLoader";

import { styles } from "./styles";

export default function SubCurrency({ name, value, darkMode, isLoading }) {
  return (
    <div css={styles.subCurrencyContainer}>
      <div css={styles.subCurrencyTitlte}>{name}</div>
      <div css={styles.subCurrencySum}>
        {isLoading ? <SkeletonLoader size="m" /> : value}
      </div>
    </div>
  );
}

SubCurrency.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  darkMode: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SubCurrency.defaultProps = {
  name: "USD",
  value: "0.00",
  darkMode: true,
  isLoading: false,
};

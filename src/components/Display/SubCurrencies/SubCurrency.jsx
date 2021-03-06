/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import SkeletonLoader from "components/UI/SkeletonLoader";

import { styles } from "./styles";

export default function SubCurrency({
  name = "USD",
  value = "0.00",
  isLoading = false,
}) {
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
  isLoading: PropTypes.bool,
};

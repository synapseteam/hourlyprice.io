/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";
import SkeletonLoader from "components/UI/SkeletonLoader";

import { styles } from "./styles";

export default function MainCurrencyDisplay({ sum, currency, isLoading }) {
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
};

MainCurrencyDisplay.defaultProps = {
  sum: 0.0,
  currency: "USD",
  isLoading: false,
};

/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";
import SkeletonLoader from "components/UI/SkeletonLoader";

import { styles } from "./styles";

const initSum = 0.0;

export default function MainCurrencyDisplay({
  sum = initSum,
  currency = "USD",
  isLoading = false,
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
};

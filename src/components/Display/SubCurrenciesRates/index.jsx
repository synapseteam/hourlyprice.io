/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { DECIMAL_SIGNS_FOR_RATES } from "utils/constants";

import { styles } from "./styles";

export default function SubCurrenciesRatesDisplay({ allCurrencies, currency }) {
  const basicRate = allCurrencies.find((el) => el.name === currency)?.rate;

  const subCurrenciesRatesArr = allCurrencies
    .filter((el) => el.name !== currency && el.rate)
    .map((el) => ({
      symbol: el.symbol,
      crossRate: (el.rate / basicRate).toFixed(DECIMAL_SIGNS_FOR_RATES),
    }));

  // eslint-disable-next-line no-magic-numbers
  const lastElIndex = subCurrenciesRatesArr.length - 1;
  return (
    <div css={styles.ratesContainer}>
      {subCurrenciesRatesArr.map((el, i) => {
        return (
          <p css={styles.rateText} key={uniqid()}>
            {`${el.symbol}${el.crossRate}`}
            {i !== lastElIndex && <span css={styles.ratesDelimiter}>/</span>}
          </p>
        );
      })}
    </div>
  );
}

SubCurrenciesRatesDisplay.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.string,
};

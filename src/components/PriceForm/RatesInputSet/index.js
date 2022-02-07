/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { handlePriceChange } from "utils/generic";

import { styles } from "./styles";

export default function RatesInputSet({
  register,
  chosenCurrency,
  allCurrencies,
  errors,
}) {
  const allCurrenciesNames = allCurrencies.map((el) => ({ name: el.name }));

  return (
    <div css={styles.ratesInputsContainer}>
      {allCurrenciesNames.map(({ name }) => {
        return (
          <input
            css={styles.ratesInput}
            {...register(name)}
            key={uniqid()}
            inputMode="decimal"
            type="text"
            autoComplete="off"
            placeholder={name}
            onChange={handlePriceChange}
          />
        );
      })}
    </div>
  );
}

RatesInputSet.propTypes = {
  register: PropTypes.func.isRequired,
  chosenCurrency: PropTypes.string.isRequired,
  allCurrencies: PropTypes.arrayOf(PropTypes.object),
  erorrs: PropTypes.object,
};

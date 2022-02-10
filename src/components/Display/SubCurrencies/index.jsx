/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import uniqid from "uniqid";

import SubCurrency from "components/Display/SubCurrencies/SubCurrency";

import { styles } from "./styles";

const initialSubCurrenciesArr = [
  { name: "EUR", value: "0.00" },
  { name: "UAH", value: "0.00" },
  { name: "RUB", value: "0.00" },
];

export default function SubCurrenciesDisplay({
  subCurrenciesArr = initialSubCurrenciesArr,
  isLoading,
}) {
  return (
    <div css={styles.mainContainer}>
      {subCurrenciesArr.map((el) => (
        <SubCurrency
          name={el.name}
          value={el.value || 0}
          key={uniqid()}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

SubCurrenciesDisplay.propTypes = {
  subCurrenciesArr: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
};

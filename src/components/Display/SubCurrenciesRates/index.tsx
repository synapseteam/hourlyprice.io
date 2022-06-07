/** @jsxImportSource @emotion/react */
import { ICurrency } from "typescript/interfaces";
import uniqid from "uniqid";

import { DECIMAL_SIGNS_FOR_RATES } from "utils/constants";

import { styles } from "./styles";

interface IProps {
  allCurrencies: ICurrency[];
  currency: string;
}
const SubCurrenciesRatesDisplay: React.FC<IProps> = ({
  allCurrencies,
  currency,
}): JSX.Element => {
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
      {subCurrenciesRatesArr.map((el, i: number) => {
        return (
          <p css={styles.rateText} key={uniqid()}>
            {`${el.symbol}${el.crossRate}`}
            {i !== lastElIndex && <span css={styles.ratesDelimiter}>/</span>}
          </p>
        );
      })}
    </div>
  );
};

export default SubCurrenciesRatesDisplay;

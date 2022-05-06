/** @jsxImportSource @emotion/react */
import { useSelector } from "react-redux";

import SubCurrenciesDisplay from "components/Display/SubCurrencies";
import MainCurrencyDisplay from "components/Display/MainCurrency/";
import SubCurrenciesRatesDisplay from "components/Display/SubCurrenciesRates";
import { useCustomTranslation } from "i18n";
import { DECIMAL_SIGNS_FOR_PRICE } from "utils/constants";

import { styles } from "./styles";

export default function Display() {
  const [t] = useCustomTranslation();
  const { price, time, currency } = useSelector(
    (state) => state.generic.fields
  );

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);
  const isLoading = useSelector((state) => state.generic.isLoading);
  const isRequestError = useSelector((state) => state.generic.ratesRequestErr);

  const mainCurrencyData = allCurrencies.find((el) => el.name === currency) || {
    name: "",
    price: 0,
    symbol: "",
  };
  function formatSum(num) {
    return new Intl.NumberFormat("de-DE")
      .format(num.toFixed(DECIMAL_SIGNS_FOR_PRICE))
      .replace(".", " ");
  }

  function generateSubCurrenciesArr(arr, basicRate) {
    const subCurrencyInitial = arr.filter((el) => el.name !== currency);
    if (!currency) {
      return subCurrencyInitial.map((el) => {
        return {
          ...el,
          value: 0,
        };
      });
    }

    return subCurrencyInitial.map((el) => {
      return {
        name: el.name,
        value: el.rate ? formatSum(el.rate * basicRate * time) : "--",
      };
    });
  }

  const basicRate = price / mainCurrencyData.rate;
  const mainCurrencySum = formatSum(time * price);
  const subCurrenciesArr = generateSubCurrenciesArr(allCurrencies, basicRate);

  return (
    <div css={styles.display}>
      <MainCurrencyDisplay
        currency={mainCurrencyData.symbol}
        sum={mainCurrencySum}
        isLoading={isLoading}
      />
      <SubCurrenciesDisplay
        subCurrenciesArr={subCurrenciesArr}
        isLoading={isLoading}
      />
      {isRequestError && <p>{t("badRequestApi")}</p>}

      <SubCurrenciesRatesDisplay
        allCurrencies={allCurrencies}
        currency={currency}
      />
    </div>
  );
}

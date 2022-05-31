/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useAppSelector } from "store/hooks";

import SubCurrenciesDisplay from "components/Display/SubCurrencies";
import MainCurrencyDisplay from "components/Display/MainCurrency/";
import SubCurrenciesRatesDisplay from "components/Display/SubCurrenciesRates";
import { DECIMAL_SIGNS_FOR_PRICE } from "utils/constants";

import { styles } from "./styles";
import { useTranslation } from "react-i18next";

const Display: FC = (): JSX.Element => {
  const [t] = useTranslation();
  const { price, time, currency } = useAppSelector(
    (state) => state.generic.fields
  );

  const allCurrencies = useAppSelector((state) => state.rates.allCurrencies);
  const isLoading = useAppSelector((state) => state.generic.isLoading);
  const isRequestError = useAppSelector(
    (state) => state.generic.ratesRequestErr
  );

  const mainCurrencyData = allCurrencies.find((el) => el.name === currency) || {
    name: "",
    rate: 0,
    symbol: "",
  };

  // TODO check any
  function formatSum(num: any) {
    return new Intl.NumberFormat("de-DE")
      .format(num.toFixed(DECIMAL_SIGNS_FOR_PRICE))
      .replace(".", " ");
  }

  // TODO check any
  function generateSubCurrenciesArr(arr: any[], basicRate: number) {
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
        value: el.rate ? formatSum(el.rate * basicRate * Number(time)) : "--",
      };
    });
  }

  const basicRate = Number(price) / mainCurrencyData.rate;
  const mainCurrencySum = formatSum(Number(time) * Number(price));
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
};

export default Display;

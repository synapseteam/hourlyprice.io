/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "components/UI/Input";
import Select from "components/UI/Select";
import RatesInputSet from "components/PriceForm/RatesInputSet";
import Button from "components/UI/Button";
import { getNewRatesThunkCreator, setManualRates } from "store/actions/rates";
import { formSchema, ratesSources } from "configure";
import {
  convertStrTimeToNum,
  handleTimeChange,
  handlePriceChange,
} from "utils/generic";
import { ratesUpdatingTimeFrame } from "configure";
import { useCustomTranslation } from "i18n";
import { transformRatesResponse } from "utils/generic";
import {
  modifyFields,
  setRequestErr as setRequestErr2,
} from "features/generic";
import { fetchRates } from "features/rates";

import { styles } from "./styles";

export default function PriceForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [t] = useCustomTranslation();

  const milisecondsInOneSecond = 1000;

  const allCurrencies = useSelector((state) => state.root.rates.allCurrencies);
  const ratesSource = useSelector((state) => state.root.rates.ratesSource);
  const timeStampCurrenciesUpdated = useSelector(
    (state) => state.root.rates.updatedAt
  );
  const allCurrenciesNames = allCurrencies.map((el) => el.name);

  const dispatch = useDispatch();

  const [chosenCurrency, setChosenCurrency] = useState("USD");
  const [chosenRatesSource, setChosenRatesSource] = useState("MasterCard");

  const [keepAPIRatesCache, setkeepAPIRatesCache] = useState(true);

  function handleListChange(e) {
    const { name, value } = e.target;
    if (name === "currency") {
      setChosenCurrency(() => value);
      setValue(value, 1);
    }
    if (name === "ratesSource") {
      setChosenRatesSource(() => value);
    }
    return;
  }

  function updateRatesIfCacheExpired() {
    const timeStampNow = new Date();
    const timePassAfterRatesUpdated =
      (timeStampNow - timeStampCurrenciesUpdated) / milisecondsInOneSecond;

    if (
      timePassAfterRatesUpdated >= ratesUpdatingTimeFrame ||
      !keepAPIRatesCache
    ) {
      dispatch(getNewRatesThunkCreator());
      dispatch(fetchRates());
    }
  }

  useEffect(() => {
    if (ratesSource === "Manual") {
      setkeepAPIRatesCache(() => false);
    }
    if (ratesSource === "MasterCard") {
      setkeepAPIRatesCache(() => true);
    }
  }, [ratesSource]);

  const onSubmit = ({
    price,
    time: timeString,
    currency,
    ratesSource,
    ...manualRates
  }) => {
    dispatch(setRequestErr2(false));

    const time = convertStrTimeToNum(timeString);

    if (ratesSource === "MasterCard") {
      updateRatesIfCacheExpired();
    }

    if (ratesSource === "Manual") {
      const newRates = transformRatesResponse(manualRates);
      dispatch(setManualRates(newRates));
    }

    dispatch(modifyFields({ price, time, currency }));
  };

  useEffect(() => {
    setValue("UAH", "");
    setValue("RUB", "");
    setValue("EUR", "");
    setValue("USD", "");
    setValue(chosenCurrency, 1);
  }, [chosenCurrency]);

  return (
    <form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          inputName="price"
          register={register}
          labelName={t("labelPrice")}
          placeholder="20.30"
          changeHandler={handlePriceChange}
          errors={errors}
        />
        <Input
          inputName="time"
          register={register}
          labelName={t("labelTime")}
          placeholder={t("timePlaceholder")}
          changeHandler={handleTimeChange}
          errors={errors}
        />
        <Select
          labelName={t("labelCurrency")}
          inputName="currency"
          register={register}
          changeHandler={handleListChange}
          value={chosenCurrency}
          optionsArr={allCurrenciesNames}
          errors={errors}
        />
        <Select
          labelName={t("labelExchangeRate")}
          inputName="ratesSource"
          register={register}
          changeHandler={handleListChange}
          value={chosenRatesSource}
          optionsArr={ratesSources}
          errors={errors}
        />
        {chosenRatesSource === "Manual" && (
          <RatesInputSet
            register={register}
            allCurrencies={allCurrencies}
            chosenCurrency={chosenCurrency}
            errors={errors}
          />
        )}
        <Button />
      </div>
    </form>
  );
}

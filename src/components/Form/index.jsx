import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import Input from "components/shared/Input";
import Select from "components/shared/Select";
import RatesInputSet from "components/Form/RatesInputSet";
import { submitFieldsData, setRequestErr } from "store/mainReducer";
import {
  getNewRatesThunkCreator,
  setManualRates,
} from "store/currenciesReducer";
import { formSchema, ratesSources } from "configure";
import {
  convertStrTimeToNum,
  handleTimeChange,
  handlePriceChange,
} from "utils";
import { ratesUpdatingTimeFrame } from "configure";
import { useAppThemeContext } from "context/AppContext";
import { useCustomTranslation } from "i18n";

import "components/Form/styles.scss";

export default function Form({ id }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [context] = useAppThemeContext();
  const darkMode = context.darkMode;

  const [t] = useCustomTranslation();

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);
  const ratesSource = useSelector((state) => state.rates.ratesSource);
  const timeStampCurrenciesUpdated = useSelector(
    (state) => state.rates.updatedAt
  );
  const allCurrenciesNames = allCurrencies.map((el) => el.name);

  const dispatch = useDispatch();

  const [chosenCurrency, setChosenCurrency] = useState("USD");
  const [chosenRatesSource, setChosenRatesSource] = useState("MasterCard");

  const [keepAPIRatesCache, setkeepAPIRatesCache] = useState(true);

  function handleListChange(e) {
    const { name, value } = e.target;
    if (name === "currency") {
      setChosenCurrency((prev) => value);
      setValue(value, 1);
    }
    if (name === "ratesSource") {
      setChosenRatesSource((prev) => value);
    }
    return;
  }

  function updateRatesIfCacheExpired() {
    const timeStampNow = new Date();
    const timePassAfterRatesUpdated =
      (timeStampNow - timeStampCurrenciesUpdated) / 1000;

    if (
      timePassAfterRatesUpdated >= ratesUpdatingTimeFrame ||
      !keepAPIRatesCache
    ) {
      dispatch(getNewRatesThunkCreator());
    }
  }

  useEffect(() => {
    if (ratesSource === "Manual") {
      setkeepAPIRatesCache((prev) => false);
    }
    if (ratesSource === "MasterCard") {
      setkeepAPIRatesCache((prev) => true);
    }
  }, [ratesSource]);

  const onSubmit = ({
    price,
    time: timeString,
    currency,
    ratesSource,
    ...manualRates
  }) => {
    dispatch(setRequestErr(false));

    const time = convertStrTimeToNum(timeString);

    if (ratesSource === "MasterCard") {
      updateRatesIfCacheExpired();
    }

    if (ratesSource === "Manual") {
      dispatch(setManualRates(manualRates));
    }

    dispatch(submitFieldsData({ price, time, currency }));
  };

  useEffect(() => {
    setValue("UAH", "");
    setValue("RUB", "");
    setValue("EUR", "");
    setValue("USD", "");
    setValue(chosenCurrency, 1);
  }, [chosenCurrency]);

  return (
    <div
      className={
        context.darkMode ? "form-container" : "form-container light-form"
      }
    >
      <form id={id} className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputName="price"
          register={register}
          labelName={t("labelPrice")}
          placeholder={t("pricePlaceholder")}
          changeHandler={handlePriceChange}
          errors={errors}
          darkMode={darkMode}
        />
        <Input
          inputName="time"
          register={register}
          labelName={t("labelTime")}
          placeholder={t("timePlaceholder")}
          changeHandler={handleTimeChange}
          errors={errors}
          darkMode={darkMode}
        />
        <Select
          labelName={t("labelCurrency")}
          inputName="currency"
          register={register}
          changeHandler={handleListChange}
          value={chosenCurrency}
          optionsArr={allCurrenciesNames}
          errors={errors}
          darkMode={darkMode}
        />
        <Select
          labelName={t("labelExchangeRate")}
          inputName="ratesSource"
          register={register}
          changeHandler={handleListChange}
          value={chosenRatesSource}
          optionsArr={ratesSources}
          errors={errors}
          darkMode={darkMode}
        />
        {chosenRatesSource === "Manual" && (
          <RatesInputSet
            register={register}
            allCurrencies={allCurrencies}
            chosenCurrency={chosenCurrency}
            errors={errors}
            darkMode={darkMode}
          />
        )}
      </form>
    </div>
  );
}

Form.propTypes = {
  id: PropTypes.string,
};

Form.defaultProps = {
  id: "calc-form",
};

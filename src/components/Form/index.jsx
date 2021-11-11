import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "components/Form/Input";
import Select from "components/Form/Select";
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

import "components/Form/styles.scss";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);
  const mainCurrency = useSelector((state) => state.main.currency);
  const timeStampCurrenciesUpdated = useSelector(
    (state) => state.rates.updatedAt
  );
  const allCurrenciesNames = allCurrencies.map((el) => el.name);

  const dispatch = useDispatch();

  const [chosenCurrency, setChosenCurrency] = useState("USD");
  const [choseRatesSource, setChosenRatesSource] = useState("MasterCard");

  function handleListChange(e) {
    const { name, value } = e.target;
    if (name === "currency") {
      setChosenCurrency((prev) => value);
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

    if (timePassAfterRatesUpdated >= ratesUpdatingTimeFrame) {
      dispatch(getNewRatesThunkCreator());
    }
  }

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
  /* 
  useEffect(() => {
    console.log(chosenCurrency, choseRatesSource, mainCurrency);
    if (mainCurrency !== chosenCurrency) {
      setChosenCurrency(mainCurrency);
    }
  }, [mainCurrency]); */

  return (
    <div className="form-container">
      <form id="calc-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputName="price"
          register={register}
          labelName="Price"
          placeholder="20.3"
          changeHandler={handlePriceChange}
          errors={errors}
        />
        <Input
          inputName="time"
          register={register}
          labelName="Time"
          placeholder="HH:MM"
          changeHandler={handleTimeChange}
          errors={errors}
        />
        <Select
          labelName="Currency"
          inputName="currency"
          register={register}
          changeHandler={handleListChange}
          value={chosenCurrency}
          optionsArr={allCurrenciesNames}
          errors={errors}
        />
        <Select
          labelName="Exchange rate"
          inputName="ratesSource"
          register={register}
          changeHandler={handleListChange}
          value={choseRatesSource}
          optionsArr={ratesSources}
          errors={errors}
        />
        {choseRatesSource === "Manual" && (
          <RatesInputSet register={register} chosenCurrency={chosenCurrency} />
        )}
      </form>
    </div>
  );
}

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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const allCurrencies = useSelector((state) => state.rates.allCurrencies);
  const ratesSource = useSelector((state) => state.rates.ratesSource);
  const timeStampCurrenciesUpdated = useSelector(
    (state) => state.rates.updatedAt
  );
  const allCurrenciesNames = allCurrencies.map((el) => el.name);

  const dispatch = useDispatch();

  const [chosenCurrency, setChosenCurrency] = useState("USD");
  const [choseRatesSource, setChosenRatesSource] = useState("MasterCard");

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

    if (timePassAfterRatesUpdated >= ratesUpdatingTimeFrame) {
      console.log("fetch request: time expired");
      dispatch(getNewRatesThunkCreator());
    }

    if (!keepAPIRatesCache) {
      console.log("fetch request: manually reset");
      dispatch(getNewRatesThunkCreator());
    }
  }

  useEffect(() => {
    if (ratesSource === "Manual") {
      setkeepAPIRatesCache((prev) => false);
    }
    if (ratesSource === "MasterCard") {
      setkeepAPIRatesCache((prev) => false);
    }
  }, [ratesSource]);

  const onSubmit = ({
    price,
    time: timeString,
    currency,
    ratesSource,
    ...manualRates
  }) => {
    console.log("submit should works");
    dispatch(setRequestErr(false));

    const time = convertStrTimeToNum(timeString);

    if (ratesSource === "MasterCard") {
      console.log("update from NASTERCARD should performed");
      setkeepAPIRatesCache((pre) => true);
      updateRatesIfCacheExpired();
    }

    if (ratesSource === "Manual") {
      console.log("update from Manual should performed");
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

  console.log("keep chache", keepAPIRatesCache, ratesSource);
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styles.scss";
import Input from "./Input";
import Select from "./Select";
import { submitFieldsData, setRequestErr } from "../../store/mainReducer";
import { getNewRatesThunkCreator } from "../../store/currenciesReducer";
import { formSchema } from "../../configure";
import {
  convertStrTimeToNum,
  handleTimeChange,
  handlePriceChange,
} from "../../utils";
import { ratesUpdatingTimeFrame } from "../../configure";

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

  function handleListChange(e) {
    setChosenCurrency((prev) => e.target.value);
  }

  function updateRatesIfCacheExpired() {
    const timeStampNow = new Date();
    const timePassAfterRatesUpdated =
      (timeStampNow - timeStampCurrenciesUpdated) / 1000;

    if (timePassAfterRatesUpdated >= ratesUpdatingTimeFrame) {
      dispatch(getNewRatesThunkCreator());
    }
  }

  const onSubmit = ({ price, time: timeString, currency }) => {
    dispatch(setRequestErr(false));

    const time = convertStrTimeToNum(timeString);

    updateRatesIfCacheExpired();
    dispatch(submitFieldsData({ price, time, currency }));
  };

  useEffect(() => {
    if (mainCurrency !== chosenCurrency) {
      setChosenCurrency(mainCurrency);
    }
  }, [mainCurrency]);

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
      </form>
    </div>
  );
}

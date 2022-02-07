/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import Input from "components/UI/Input";
import Select from "components/UI/Select";
import RatesInputSet from "components/PriceForm/RatesInputSet";
import Button from "components/UI/Button";
import { submitFieldsData, setRequestErr } from "store/actions/generic";
import { getNewRatesThunkCreator, setManualRates } from "store/actions/rates";
import { formSchema, ratesSources } from "configure";
import {
  convertStrTimeToNum,
  handleTimeChange,
  handlePriceChange,
} from "utils/generic";
import { ratesUpdatingTimeFrame } from "configure";
import { useCustomTranslation } from "i18n";

import { styles } from "./styles";

export default function PriceForm({ children }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

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

PriceForm.propTypes = {
  id: PropTypes.string,
};

PriceForm.defaultProps = {
  id: "calc-form",
};

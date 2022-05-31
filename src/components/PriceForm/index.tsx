/** @jsxImportSource @emotion/react */
import { useState, useEffect, FC, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputLabel from "components/UI/InputLabel";
import Select from "components/UI/Select";
import RatesInputSet from "components/PriceForm/RatesInputSet";
import Button from "components/UI/Button";
import { ratesSources } from "configure";
import {
  convertStrTimeToNum,
  handleTimeChange,
  handlePriceChange,
} from "utils/generic";
import { ratesUpdatingTimeFrame } from "configure";
import { useCustomTranslation } from "i18n";
import { transformRatesResponse } from "utils/generic";
import { modifyFields, setRequestErr } from "features/generic";
import { fetchRates } from "features/rates";
import { setManualRates as setManualRates2 } from "features/rates";
import {
  clearFields,
  setInvoiceItemAdded,
  setInvoiceFull,
} from "features/generic";
import { MILISEC_IN_ONE_SEC } from "utils/constants";

import { styles } from "./styles";

const PriceForm: FC = (): JSX.Element => {
  const [t] = useCustomTranslation();

  const formSchema = yup.object().shape({
    price: yup.number().typeError(t("priceError")).positive().required(),
    time: yup.string().required(t("timeError")),
    currency: yup.string().required().oneOf(["USD", "UAH", "EUR"]),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const allCurrencies = useAppSelector((state) => state.rates.allCurrencies);
  const ratesSource = useAppSelector((state) => state.rates.ratesSource);
  const timeStampCurrenciesUpdated = useAppSelector(
    (state) => state.rates.updatedAt
  );
  const { price, time } = useAppSelector((state) => state.generic.fields);

  const allCurrenciesNames = allCurrencies.map((el) => {
    return { name: el.name, value: el.name };
  });

  const dispatch = useAppDispatch();
  const [chosenCurrency, setChosenCurrency] = useState("USD");
  const [chosenRatesSource, setChosenRatesSource] = useState("masterCard");

  const [keepAPIRatesCache, setkeepAPIRatesCache] = useState(true);

  useEffect(() => {
    const currency = JSON.parse(localStorage.getItem("currency"));
    if (currency) {
      setChosenCurrency(currency);
    }
  }, []);

  function handleListChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    if (name === "currency") {
      setChosenCurrency(() => value);
      localStorage.setItem("currency", JSON.stringify(value));
      // eslint-disable-next-line no-magic-numbers
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
      (Number(timeStampNow) - Number(timeStampCurrenciesUpdated)) /
      MILISEC_IN_ONE_SEC;

    if (
      timePassAfterRatesUpdated >= ratesUpdatingTimeFrame ||
      !keepAPIRatesCache
    ) {
      dispatch(fetchRates());
    }
  }

  useEffect(() => {
    if (ratesSource === "manual") {
      setkeepAPIRatesCache(() => false);
    }
    if (ratesSource === "masterCard") {
      setkeepAPIRatesCache(() => true);
    }
  }, [ratesSource]);

  const onSubmit: SubmitHandler<FieldValues> = ({
    price,
    time: timeString,
    currency,
    ratesSource,
    ...manualRates
  }) => {
    dispatch(setRequestErr(false));

    const time = convertStrTimeToNum(timeString);

    if (ratesSource === "masterCard") {
      updateRatesIfCacheExpired();
    }

    if (ratesSource === "manual") {
      const newRates = transformRatesResponse(manualRates);
      dispatch(setManualRates2(newRates));
    }

    dispatch(modifyFields({ price, time, currency }));
  };

  useEffect(() => {
    setValue("UAH", "");
    setValue("EUR", "");
    setValue("USD", "");
    // eslint-disable-next-line no-magic-numbers
    setValue(chosenCurrency, 1);
  }, [chosenCurrency]);

  const addItemToLocalStorage = () => {
    const invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    const invoiceObj = {
      description: "No description",
      price: price,
      time: time,
    };
    if (!invoiceItems) {
      const invoiceArray = [];
      invoiceArray.push(invoiceObj);
      localStorage.setItem("invoiceItems", JSON.stringify(invoiceArray));
      dispatch(clearFields());
    }
    if (invoiceItems && invoiceItems.length <= 9) {
      invoiceItems.push(invoiceObj);
      localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
      dispatch(clearFields());
      dispatch(setInvoiceItemAdded(true));
    } else if (invoiceItems && invoiceItems.length >= 10) {
      dispatch(setInvoiceFull(true));
    }
  };

  const addToInvoiceButtonStyles = [
    styles.button,
    price ? styles.addToInvoiceButtonVisible : styles.addToInvoiceButton,
  ];

  const submitButtonStyles = price ? styles.button : styles.buttonWide;

  return (
    <form css={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.currency}>
        <InputLabel
          inputName="price"
          register={register}
          labelName={t("labelPrice")}
          placeholder="0.0"
          changeHandler={handlePriceChange}
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
      </div>
      <InputLabel
        inputName="time"
        register={register}
        labelName={t("labelTime")}
        placeholder={t("timePlaceholder")}
        changeHandler={handleTimeChange}
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
      {chosenRatesSource === "manual" && (
        <RatesInputSet
          register={register}
          allCurrencies={allCurrencies}
          chosenCurrency={chosenCurrency}
          error={errors}
        />
      )}
      <div css={styles.buttons}>
        <div css={submitButtonStyles}>
          <Button type="submit">{t("btnResult")}</Button>
        </div>
        <div css={addToInvoiceButtonStyles}>
          <Button type="button" onClick={addItemToLocalStorage}>
            {t("addToInvoice")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PriceForm;

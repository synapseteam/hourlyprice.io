/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18n";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BaseDatePicker from "../UI/DatePicker/index";
import { useForm, useFieldArray } from "react-hook-form";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BaseInput from "../UI/Input/index";
import "react-datepicker/dist/react-datepicker.css";
import { useCustomTranslation } from "../../i18n";
import LogoUa from "../../assets/ukraine-heart.png";
import LogoUs from "../../assets/us-heart.png";
import { styles } from "./styles";

export const Invoice = () => {
  const [t] = useCustomTranslation();
  const { i18n } = useTranslation();
  const now = new Date();
  const isEditMode = useSelector((state) => state.generic.isEditMode);
  const [orderTotal, setOrderTotal] = useState(0);
  const [chosenCurrencySign, setChosenCurrencySign] = useState("$");
  const [isAddServiceButtonDisabled, setIsAddServiceButtonDisabled] =
    useState(false);

  useEffect(() => {
    const currency = JSON.parse(localStorage.getItem("currency"));
    if (currency) {
      currency === "USD" && setChosenCurrencySign("$");
      currency === "EUR" && setChosenCurrencySign("€");
      currency === "UAH" && setChosenCurrencySign("₴");
    }
  }, []);

  const JsSchema = Yup.object().shape({
    services: Yup.array().of(
      Yup.object().shape({
        title: Yup.string(),
        price: Yup.number(),
        time: Yup.number(),
        total: Yup.number(),
      })
    ),
  });

  const weekFromNow = new Date(new Date().setDate(new Date().getDate() + 7));
  const defaultValues = {
    invoice: "Invoice",
    teamName: "Synapse Team LLC",
    code: "USREOU Code: 42772269",
    location: "Ukraine, Zaporizhzhia",
    email: "email@test.com",
    invoiceNumber: "001",
    agreementNumber: " # INV-001 to the Agreement 777",
    billToColumn1: "column1",
    billToColumn2: "column2",
    billToColumn3: "column3",
    invoiceDate: now,
    dueDate: weekFromNow,
    notes: "Thanks for your business",
    wireTransferDetails:
      "Lorem Ipsum is simply dummy text\n" +
      "Lorem Ipsum is simply dummy text of the printing.\n" +
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
      "Lorem Ipsum is simply.\n" +
      "Lorem Ipsum is simply dummy text of the printing and typesetting\n",
  };

  const { register, control, getValues, setValue, watch } = useForm({
    defaultValues,
    resolver: yupResolver(JsSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "services",
    control,
  });

  const formValues = getValues();

  const calculateOrderTotal = () => {
    if (formValues && formValues.services) {
      const total = formValues.services.reduce(
        (acc, curr) => Number(curr.total) + acc,
        0
      );
      setOrderTotal(total);
    }
  };

  useEffect(() => {
    calculateOrderTotal();
  }, [formValues.services]);

  useEffect(() => {
    const invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));

    invoiceItems &&
      invoiceItems.length < 10 &&
      invoiceItems.forEach((item) => {
        append({
          title: item.title ? item.title : "No description",
          price: item.price,
          time: item.time,
          total: item.price * item.time,
        });
      });

    if (invoiceItems && invoiceItems.length > 9) {
      setIsAddServiceButtonDisabled(true);
    }
  }, []);

  const watchAllFields = watch(["services"]);

  useEffect(() => {
    localStorage.setItem("invoiceItems", JSON.stringify(watchAllFields[0]));
  }, [watchAllFields]);

  const addService = () => {
    const invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    const invoiceObj = {
      description: "",
      price: "",
      time: "",
      total: "",
    };
    if (!invoiceItems) {
      let invoiceArray = [];
      append({ title: "", price: "", time: "", total: "" });

      invoiceArray.push(invoiceObj);
      localStorage.setItem("invoiceItems", JSON.stringify(invoiceArray));
    }
    if (invoiceItems && invoiceItems.length < 10) {
      append({ title: "", price: "", time: "", total: "" });

      invoiceItems.push(invoiceObj);
      localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    }
    if (invoiceItems && invoiceItems.length > 9) {
      setIsAddServiceButtonDisabled(true);
    }
  };

  const removeService = (index) => {
    let invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    invoiceItems.splice(index, 1);
    localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    remove(index);
    setIsAddServiceButtonDisabled(false);
  };

  const generalInfoStyles = [
    styles.generalInfoColumn,
    !isEditMode && styles.generalInfoColumnNoEdit,
  ];

  const switchLang = (lang) => {
    if (isEditMode) changeLanguage(lang);
  };

  const logoStyles = [styles.logo, isEditMode && styles.logoEdit];

  const watchInvoiceDate = watch("invoiceDate");
  const watchDueDate = watch("dueDate");

  return (
    <>
      <form>
        <div css={styles.actionPanel}></div>
        <div css={styles.invoice}>
          <div css={[styles.row, styles.invoiceHeadingRow]}>
            <div css={logoStyles}>
              {i18n.language === "ua" && (
                <img
                  onClick={() => switchLang("en")}
                  src={LogoUa}
                  alt={"Ukraine"}
                />
              )}
              {i18n.language === "en" && (
                <img
                  onClick={() => switchLang("ua")}
                  src={LogoUs}
                  alt={"Usa"}
                />
              )}
            </div>
            <div css={styles.title}>
              <BaseInput
                register={register}
                classname={styles.field}
                inputName="invoice"
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div css={styles.row}>
            <div css={styles.column}>
              <BaseInput
                register={register}
                classname={styles.field}
                inputName="teamName"
                disabled={!isEditMode}
              />
              <BaseInput
                register={register}
                classname={styles.field}
                inputName="code"
                disabled={!isEditMode}
              />
              <BaseInput
                register={register}
                classname={styles.field}
                inputName="location"
                disabled={!isEditMode}
              />
              <BaseInput
                register={register}
                classname={styles.field}
                inputName="email"
                disabled={!isEditMode}
              />
            </div>
            <div css={[styles.column, styles.agreementColumn]}>
              <BaseInput
                register={register}
                classname={[styles.field, styles.fieldBold, styles.bigField]}
                inputName="agreementNumber"
                disabled={!isEditMode}
              />
              <span css={styles.text}>&nbsp;</span>
              <span css={[styles.text, styles.fieldBold]}>Balance Due</span>
              <span css={[styles.text, styles.balanceDue, styles.fieldBold]}>
                {chosenCurrencySign + orderTotal.toFixed(2)}
              </span>
            </div>
          </div>
          <div css={styles.row}>
            <div css={styles.column1}>
              <span css={[styles.text, styles.fieldBold]}>Bill To</span>
              <div css={styles.column}>
                <BaseInput
                  register={register}
                  classname={styles.field}
                  inputName="billToColumn1"
                  disabled={!isEditMode}
                />
                <BaseInput
                  register={register}
                  classname={styles.field}
                  inputName="billToColumn2"
                  disabled={!isEditMode}
                />
                <BaseInput
                  register={register}
                  classname={styles.field}
                  inputName="billToColumn3"
                  disabled={!isEditMode}
                />
              </div>
            </div>
            <div css={styles.column2}>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>&nbsp;</span>
              <span css={[styles.text, styles.fieldBold]}>Invoice Date:</span>
              <span css={[styles.text, styles.fieldBold]}>Due Date:</span>
            </div>
            <div css={styles.column3}>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>&nbsp;</span>
              <BaseDatePicker
                classname={[
                  styles.field,
                  styles.fieldBold,
                  styles.mediumField,
                  styles.fieldDate,
                ]}
                register={register}
                selected={watchInvoiceDate}
                disabled={!isEditMode}
                width={95}
                dateFormat="dd/MM/yyyy"
                inputName="invoiceDate"
                onChange={(date) => setValue("invoiceDate", date.getTime())}
              />
              <BaseDatePicker
                classname={[
                  styles.field,
                  styles.fieldBold,
                  styles.mediumField,
                  styles.fieldDate,
                ]}
                register={register}
                width={95}
                selected={watchDueDate}
                disabled={!isEditMode}
                dateFormat="dd/MM/yyyy"
                inputName="dueDate"
                onChange={(date) => setValue("dueDate", date.getTime())}
              />
            </div>
          </div>
          <div css={styles.details}>
            <div css={styles.heading}>
              <span css={styles.headingColumn1}>#</span>
              <span css={styles.headingColumn2}>Description</span>
              <span css={styles.headingColumn3}>Price</span>
              <span css={styles.headingColumn4}>Time</span>
              <span css={styles.headingColumn5}>Total</span>
              {isEditMode && <span css={styles.headingColumn5}>&nbsp;</span>}
            </div>

            {fields.map((item, index) => (
              <div key={index} css={[styles.row, styles.headingRow]}>
                <span
                  css={[
                    styles.headingColumn,
                    styles.headingColumn1,
                    styles.agreementNumber,
                  ]}
                >
                  {index + 1}
                </span>
                <span css={[styles.headingColumn, styles.headingColumn2]}>
                  <BaseInput
                    register={register}
                    classname={styles.field}
                    inputName={`services[${index}].title`}
                    disabled={!isEditMode}
                    placeholder={t("decriptionPlaceholder")}
                    maxLength={45}
                  />
                </span>
                <span css={[styles.headingColumn, styles.headingColumn3]}>
                  <span css={styles.serviceCurrency}>{chosenCurrencySign}</span>
                  <BaseInput
                    register={register}
                    classname={[styles.field, styles.serviceInput]}
                    inputName={`services[${index}].price`}
                    placeholder="0.0"
                    disabled={!isEditMode}
                    type="number"
                    maxLength={45}
                    onChange={(e) => {
                      setValue(
                        `services.${index}.total`,
                        (
                          Number(e.target.value) *
                          convertStrTimeToNum(formValues.services[index].time)
                        ).toFixed(2)
                      );
                      calculateOrderTotal();
                    }}
                  />
                </span>
                <span css={[styles.headingColumn, styles.headingColumn4]}>
                  <BaseInput
                    register={register}
                    classname={[styles.field, styles.serviceInput]}
                    inputName={`services[${index}].time`}
                    disabled={!isEditMode}
                    maxLength={45}
                    placeholder={t("timePlaceholder")}
                    onChange={(e) => {
                      handleTimeChange(e);
                      setValue(
                        `services.${index}.total`,
                        (
                          Number(formValues.services[index].price) *
                          convertStrTimeToNum(e.target.value)
                        ).toFixed(2)
                      );
                      calculateOrderTotal();
                    }}
                  />
                </span>
                <span
                  css={[
                    styles.headingColumn,
                    styles.fieldBold,
                    styles.headingColumn5,
                  ]}
                >
                  <span css={styles.serviceCurrency}>{chosenCurrencySign}</span>
                  <BaseInput
                    register={register}
                    classname={[styles.field, styles.serviceInput]}
                    inputName={`services[${index}].total`}
                    disabled={!isEditMode}
                    readOnly={true}
                    placeholder="0.0"
                    maxLength={45}
                  />
                </span>

                {isEditMode && (
                  <button
                    css={styles.button}
                    type="button"
                    onClick={() => removeService(index)}
                  >
                    {t("remove")}
                  </button>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                css={styles.addButton}
                type="button"
                disabled={isAddServiceButtonDisabled}
                onClick={addService}
              >
                {t("addService")}
              </button>
            )}

            <div css={generalInfoStyles}>
              <div css={styles.generalInfo}>
                <span>Total: {chosenCurrencySign + orderTotal.toFixed(2)}</span>
              </div>
              <div css={styles.generalInfo}>
                <div css={styles.balanceDueTotal}>
                  Balance Due: {chosenCurrencySign + orderTotal.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div css={styles.transferDetails}>
            <span css={styles.text}>
              <strong>Notes</strong>
            </span>
            <span css={styles.text}>
              <textarea
                css={[styles.field, styles.textarea, styles.notesTextArea]}
                disabled={!isEditMode}
                maxLength={250}
                {...register("notes", { required: true })}
              />
            </span>
            <span css={styles.text}>
              <strong>Wire Transfer Details:</strong>
            </span>
            <textarea
              css={[styles.field, styles.textarea, styles.bigTextarea]}
              disabled={!isEditMode}
              maxLength={250}
              {...register("wireTransferDetails", { required: true })}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Invoice;

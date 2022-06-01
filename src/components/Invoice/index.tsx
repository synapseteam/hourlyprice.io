/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next";
import JsPDF from "jspdf";
import { useEffect, useState } from "react";
import BaseDatePicker from "../UI/DatePicker/index";
import {
  useForm,
  useFieldArray,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import BaseInput from "../UI/Input/index";
import Button from "components/UI/Button";
import "react-datepicker/dist/react-datepicker.css";
import LogoUa from "../../assets/ukraine-heart.png";
import LogoUs from "../../assets/us-heart.png";
import { changeLanguage } from "i18next";
import { styles } from "./styles";
import { IDetails } from "typescript/interfaces";

const Invoice: React.FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const now = new Date();
  const [isEditMode, setIsEditMode] = useState(true);
  const [orderTotal, setOrderTotal] = useState(0);
  const [chosenCurrencySign, setChosenCurrencySign] = useState("$");

  useEffect(() => {
    const currency = JSON.parse(localStorage.getItem("currency"));
    if (currency) {
      currency === "USD" && setChosenCurrencySign("$");
      currency === "EUR" && setChosenCurrencySign("€");
      currency === "UAH" && setChosenCurrencySign("₴");
    }
  }, []);

  const weekFromNow = new Date(new Date().setDate(new Date().getDate() + 7));

  const defaultValues: FieldValues = {
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
    details: [
      {
        title: "Development services",
        price: 10.5,
        quantity: "10:30",
        total: "110.25",
      },
    ],
    notes: "Thanks for your business",
    wireTransferDetails:
      "Lorem Ipsum is simply dummy text\n" +
      "Lorem Ipsum is simply dummy text of the printing.\n" +
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
      "Lorem Ipsum is simply.\n" +
      "Lorem Ipsum is simply dummy text of the printing and typesetting\n",
  };

  useEffect(() => {
    const invoiceDoc = JSON.parse(localStorage.getItem("invoiceDoc"));
    reset(invoiceDoc);
  }, []);

  const { register, control, handleSubmit, getValues, reset, setValue, watch } =
    useForm({
      defaultValues,
    });
  const { append, remove } = useFieldArray({
    name: "details",
    control,
  });

  const formValues = getValues();

  const calculateOrderTotal = (): void => {
    if (formValues && formValues.details) {
      const total = formValues.details.reduce(
        (acc: number, curr: { total: string }) => Number(curr.total) + acc,
        0
      );
      setOrderTotal(total);
    }
  };

  useEffect(() => {
    calculateOrderTotal();
  }, [formValues.details]);

  const addService = (): void => {
    append({
      title: "",
      price: 0,
      quantity: "",
      total: "",
    });
  };

  const generalInfoStyles = [
    styles.generalInfoColumn,
    !isEditMode && styles.generalInfoColumnNoEdit,
  ];

  const switchLang = (lang: string): void => {
    if (isEditMode) changeLanguage(lang);
  };

  const logoStyles = [styles.logo, isEditMode && styles.logoEdit];

  const watchInvoiceDate = new Date(watch("invoiceDate"));

  const watchDueDate = new Date(watch("dueDate"));

  const onSubmit: SubmitHandler<FieldValues> = (data): void => {
    setIsEditMode(!isEditMode);
    localStorage.setItem("invoiceDoc", JSON.stringify(data));
  };

  const generatePDF = (): void => {
    const report = new JsPDF("p", "px", [936, 1300]);
    report.viewerPreferences({ CenterWindow: true }, true);
    report
      .html(document.getElementById("#report"), { margin: [20, 10, 10, 50] })
      .then(() => {
        report.save("report.pdf");
      });
  };
  return (
    <>
      <form id="invoice-form" onSubmit={handleSubmit(onSubmit)}>
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

            {formValues.details.map((item: IDetails, index: number) => (
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
                    inputName={`details[${index}].title`}
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
                    inputName={`details[${index}].price`}
                    placeholder="0.0"
                    disabled={!isEditMode}
                    maxLength={45}
                    onChange={(e) => {
                      setValue(
                        `details.${index}.total`,
                        (
                          Number(e.target.value) *
                          convertStrTimeToNum(
                            formValues.details[index].quantity
                          )
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
                    inputName={`details[${index}].quantity`}
                    disabled={!isEditMode}
                    maxLength={45}
                    placeholder={t("timePlaceholder")}
                    onChange={(e) => {
                      handleTimeChange(e);
                      setValue(
                        `details.${index}.total`,
                        (
                          Number(formValues.details[index].price) *
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
                    inputName={`details[${index}].total`}
                    disabled={!isEditMode}
                    readOnly={true}
                    placeholder="0.0"
                    maxLength={45}
                  />
                </span>

                {isEditMode && (
                  <button
                    css={styles.removeButton}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    {t("remove")}
                  </button>
                )}
              </div>
            ))}

            {isEditMode && (
              <button css={styles.addButton} type="button" onClick={addService}>
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
                {...register("notes")}
              />
            </span>
            <span css={styles.text}>
              <strong>Wire Transfer Details:</strong>
            </span>
            <textarea
              css={[styles.field, styles.textarea, styles.bigTextarea]}
              disabled={!isEditMode}
              maxLength={250}
              {...register("wireTransferDetails")}
            />
          </div>
        </div>
      </form>
      <div css={styles.buttons}>
        <div css={styles.button}>
          {isEditMode && (
            <Button type="submit" form="invoice-form">
              {t("save")}
            </Button>
          )}
          {!isEditMode && (
            <Button onClick={() => setIsEditMode(!isEditMode)} type="button">
              {t("edit")}
            </Button>
          )}
        </div>
        <div css={styles.button}>
          <Button onClick={generatePDF} type="button" disabled={isEditMode}>
            {t("exportToPDFText")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Invoice;

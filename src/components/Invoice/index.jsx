/** @jsxImportSource @emotion/react */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Logo from "../../assets/ukraine-heart.png";
import { styles } from "./styles";

export const Invoice = () => {
  const isEditMode = useSelector((state) => state.generic.isEditMode);
  const now = new Date();
  const weekFromNow = new Date(new Date().setDate(new Date().getDate() + 7));
  const [startDate, setStartDate] = useState(now);
  const [weekFromNowDate, setWeekFromNowDate] = useState(weekFromNow);
  const [orderTotal, setOrderTotal] = useState(0);

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

  const defaultValues = {
    invoice: "Invoice",
    teamName: "Synapse Team LLC",
    code: "42772269",
    location: "Ukraine, Zaporizhzhia",
    email: "email@test.com",
    invoiceNumber: "001",
    agreementNumber: "777",
    balanceDue: "7777777",
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
      "Lorem Ipsum is simply dummy text of the printing and typesetting\n" +
      "\n" +
      "Lorem Ipsum is simply dummy text of the printing.\n" +
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
      "Lorem Ipsum is simply.\n" +
      "Lorem Ipsum is simply dummy text of the printing and typesetting",
  };
  const { register, control, getValues, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(JsSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "services",
    control,
  });

  const formValues = getValues();

  const calculateOrderTotal = () => {
    if (formValues.services) {
      const total = formValues.services.reduce(
        (acc, curr) => Number(curr.total) + acc,
        0
      );
      setOrderTotal(total);
    }
  };

  useEffect(() => {
    const invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));

    invoiceItems.forEach((item) => {
      append({
        title: "no description",
        price: item.price,
        time: item.time,
        total: item.price * item.time,
      });
    });
  }, []);

  const addService = () => {
    append({ title: "", price: 0, time: 0, total: 0 });

    const invoiceObj = {
      description: "",
      price: 0,
      time: 0,
      total: 0,
    };
    const invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    if (!invoiceItems) {
      let invoiceArray = [];
      invoiceArray.push(invoiceObj);
      localStorage.setItem("invoiceItems", JSON.stringify(invoiceArray));
    }
    if (invoiceItems) {
      invoiceItems.push(invoiceObj);
      localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    }
  };
  const removeService = (index) => {
    let invoiceItems = JSON.parse(localStorage.getItem("invoiceItems"));
    invoiceItems.splice(index, 1);
    localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    remove(index);
  };
  return (
    <>
      <form>
        <div css={styles.actionPanel}></div>
        <div css={styles.invoice}>
          <div css={[styles.row, styles.invoiceHeadingRow]}>
            <div css={styles.logo}>
              <img src={Logo} alt={"Ukraine"} />
            </div>
            <div css={styles.title}>
              <input
                css={styles.field}
                {...register("invoice", { required: true })}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div css={styles.row}>
            <div css={styles.column}>
              <span css={styles.text}>
                <strong>
                  <input
                    css={styles.field}
                    {...register("teamName", { required: true })}
                    disabled={!isEditMode}
                  />
                </strong>
              </span>
              <span css={styles.text}>
                USREOU Code:
                <input
                  css={[styles.field, styles.mediumField]}
                  {...register("code", { required: true })}
                  disabled={!isEditMode}
                />
              </span>
              <span css={styles.text}>
                <input
                  css={styles.field}
                  {...register("location", { required: true })}
                  disabled={!isEditMode}
                />
              </span>
              <span css={styles.text}>
                <input
                  css={styles.field}
                  {...register("email", { required: true })}
                  disabled={!isEditMode}
                />
              </span>
            </div>
            <div css={[styles.column, styles.agreementColumn]}>
              <span css={styles.text}>
                <strong>
                  # INV-{" "}
                  <input
                    css={[styles.field, styles.smallField, styles.fieldBold]}
                    {...register("invoiceNumber", { required: true })}
                    disabled={!isEditMode}
                  />{" "}
                  to the Agreement{" "}
                  <input
                    css={[styles.field, styles.smallField, styles.fieldBold]}
                    {...register("agreementNumber", { required: true })}
                    disabled={!isEditMode}
                  />
                </strong>
              </span>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>
                <strong>Balance Due</strong>
              </span>
              <span css={[styles.text, styles.balanceDue]}>
                <input
                  css={[styles.field, styles.fieldBold, styles.mediumField]}
                  type="text"
                  pattern="\d*"
                  maxLength="7"
                  disabled={!isEditMode}
                  {...register("balanceDue", { required: true })}
                />
              </span>
            </div>
          </div>
          <div css={styles.row}>
            <div css={styles.column1}>
              <span css={styles.text}>Bill To</span>
              <div css={styles.column}>
                <span css={styles.text}>
                  <input
                    css={styles.field}
                    {...register("billToColumn1", { required: true })}
                    disabled={!isEditMode}
                  />
                </span>
                <span css={styles.text}>
                  <input
                    css={styles.field}
                    {...register("billToColumn2", { required: true })}
                    disabled={!isEditMode}
                  />
                </span>
                <span css={styles.text}>
                  <input
                    css={styles.field}
                    {...register("billToColumn3", { required: true })}
                    disabled={!isEditMode}
                  />
                </span>
              </div>
            </div>
            <div css={styles.column2}>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>
                <strong>Invoice Date:</strong>
              </span>
              <span css={styles.text}>
                <strong>Due Date:</strong>
              </span>
            </div>
            <div css={styles.column3}>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>
                <DatePicker
                  css={[
                    styles.field,
                    styles.fieldBold,
                    styles.mediumField,
                    styles.dataPicker,
                  ]}
                  {...register("invoiceDate", { required: true })}
                  selected={startDate}
                  disabled={!isEditMode}
                  onChange={(date) => setStartDate(date)}
                />
              </span>
              <span css={styles.text}>
                <DatePicker
                  css={[
                    styles.field,
                    styles.fieldBold,
                    styles.mediumField,
                    styles.dataPicker,
                  ]}
                  {...register("dueDate", { required: true })}
                  selected={weekFromNowDate}
                  disabled={!isEditMode}
                  onChange={(date) => setWeekFromNowDate(date)}
                />
              </span>
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
                <span css={[styles.headingColumn, styles.headingColumn1]}>
                  {index + 1}
                </span>
                <span css={[styles.headingColumn, styles.headingColumn2]}>
                  <textarea
                    css={[styles.field, styles.serviceInput]}
                    name={`services[${index}]title`}
                    {...register(`services.${index}.title`)}
                    maxLength={90}
                    disabled={!isEditMode}
                  />
                </span>
                <span css={[styles.headingColumn, styles.headingColumn3]}>
                  <input
                    css={[styles.field, styles.serviceInput]}
                    name={`services[${index}]price`}
                    type="number"
                    disabled={!isEditMode}
                    {...register(`services.${index}.price`)}
                    onChange={(e) => {
                      setValue(
                        `services.${index}.total`,
                        Number(e.target.value) *
                          Number(formValues.services[index].time),
                        { shouldTouch: true }
                      );
                      calculateOrderTotal();
                    }}
                  />
                </span>
                <span css={[styles.headingColumn, styles.headingColumn4]}>
                  <input
                    css={[styles.field, styles.serviceInput]}
                    name={`services[${index}]time`}
                    type="number"
                    disabled={!isEditMode}
                    {...register(`services.${index}.time`)}
                    onChange={(e) => {
                      setValue(
                        `services.${index}.total`,
                        Number(formValues.services[index].price) *
                          Number(e.target.value),
                        { shouldTouch: true }
                      );
                      calculateOrderTotal();
                    }}
                  />
                </span>
                <span css={[styles.headingColumn, styles.headingColumn5]}>
                  <input
                    css={[styles.field, styles.serviceInput]}
                    name={`services[${index}]total`}
                    type="number"
                    readOnly={true}
                    disabled={!isEditMode}
                    {...register(`services.${index}.total`)}
                  />
                </span>
                {isEditMode && (
                  <button
                    css={styles.button}
                    type="button"
                    onClick={(e) => removeService(e, index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {isEditMode && (
              <button css={styles.button} type="button" onClick={addService}>
                Add service
              </button>
            )}

            <div css={styles.generalInfoColumn}>
              <div css={styles.generalInfo}>
                <strong>Total:</strong>
                <span>{orderTotal}</span>
              </div>
              <div css={styles.generalInfo}>
                <strong>Balance Due:</strong>
                <span>{orderTotal}</span>
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
              maxLength={500}
              {...register("wireTransferDetails", { required: true })}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Invoice;

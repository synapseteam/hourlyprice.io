/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../../assets/ukraine-heart.png";
import { styles } from "./styles";

export const Invoice = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const JsSchema = Yup.object().shape({
    services: Yup.array().of(
      Yup.object().shape({
        title: Yup.string(),
        qty: Yup.number(),
        rate: Yup.number(),
        amount: Yup.number(),
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
    balanceDue: "some value",
    billToColumn1: "column1",
    billToColumn2: "column2",
    billToColumn3: "column3",
    invoiceDate: "start date",
    dueDate: "end date",
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
  const { handleSubmit, register, control, getValues, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(JsSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "services",
    control,
  });
  const formValues = getValues();

  const onSubmit = (data) => {
    console.log("data = ", data);
    setIsEditMode(false);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const calculateOrderTotal = () => {
    if (formValues.services) {
      const total = formValues.services.reduce(
        (acc, curr) => Number(curr.amount) + acc,
        0
      );
      setOrderTotal(total);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  # INV-
                  <input
                    css={[styles.field, styles.smallField]}
                    {...register("invoiceNumber", { required: true })}
                    disabled={!isEditMode}
                  />{" "}
                  to the Agreement
                  <input
                    css={[styles.field, styles.smallField]}
                    {...register("agreementNumber", { required: true })}
                    disabled={!isEditMode}
                  />
                </strong>
              </span>
              <span css={styles.text}>&nbsp;</span>
              <span css={styles.text}>
                <strong>Balance Due</strong>
              </span>
              <span css={styles.text}>
                <input
                  css={[styles.field, styles.mediumField]}
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
              <span css={styles.text}>
                <strong>Bill To</strong>
              </span>
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
                <input
                  css={[styles.field, styles.mediumField]}
                  {...register("invoiceDate", { required: true })}
                  disabled={!isEditMode}
                />
              </span>
              <span css={styles.text}>
                <input
                  css={[styles.field, styles.mediumField]}
                  {...register("dueDate", { required: true })}
                  disabled={!isEditMode}
                />
              </span>
            </div>
          </div>
          <div css={styles.details}>
            <div css={styles.heading}>
              <span css={styles.headingColumn1}>#</span>
              <span css={styles.headingColumn2}>Item & Description</span>
              <span css={styles.headingColumn3}>Qty</span>
              <span css={styles.headingColumn4}>Rate</span>
              <span css={styles.headingColumn5}>Amount</span>
              <span css={styles.headingColumn5}>&nbsp;</span>
            </div>
            {isEditMode && (
              <button
                type="button"
                onClick={() =>
                  append({ title: "", qty: 0, rate: 0, amount: 0 })
                }
              >
                Add service
              </button>
            )}
            {fields.map((item, index) => (
              <div key={index} css={[styles.row, styles.headingRow]}>
                <span css={styles.headingColumn1}>{index}</span>
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
                    name={`services[${index}]qty`}
                    type="number"
                    disabled={!isEditMode}
                    {...register(`services.${index}.qty`)}
                    onChange={(e) => {
                      setValue(
                        `services.${index}.amount`,
                        Number(e.target.value) *
                          Number(formValues.services[index].rate),
                        { shouldTouch: true }
                      );
                      calculateOrderTotal();
                    }}
                  />
                </span>
                <span css={[styles.headingColumn, styles.headingColumn4]}>
                  <input
                    css={[styles.field, styles.serviceInput]}
                    name={`services[${index}]rate`}
                    type="number"
                    disabled={!isEditMode}
                    {...register(`services.${index}.rate`)}
                    onChange={(e) => {
                      setValue(
                        `services.${index}.amount`,
                        Number(formValues.services[index].qty) *
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
                    name={`services[${index}]amount`}
                    type="number"
                    readOnly={true}
                    disabled={!isEditMode}
                    {...register(`services.${index}.amount`)}
                  />
                </span>
                <button onClick={() => remove(index)}>Remove</button>
              </div>
            ))}
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
              css={[styles.field, styles.textarea]}
              disabled={!isEditMode}
              maxLength={500}
              {...register("wireTransferDetails", { required: true })}
            />
          </div>
        </div>
        {!isEditMode && (
          <button type="button" onClick={handleEditMode}>
            Edit
          </button>
        )}
        {isEditMode && <button type={"submit"}>Save</button>}
      </form>
    </>
  );
};

export default Invoice;

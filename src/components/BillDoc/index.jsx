/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import JsPDF from "jspdf";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import BaseInput from "../UI/Input";
import { styles } from "./styles";
import BaseDatePicker from "../UI/DatePicker";
import Button from "../UI/Button";
import PropTypes from "prop-types";
import CloseIcon from "../../assets/close.svg";

export default function BillDoc({
  selectedBill,
  setBillItems,
  setIsBillAdded,
  setIsBillUpdated,
  selectedUser,
}) {
  const now = new Date();
  const [orderTotal, setOrderTotal] = useState(0);
  const [isEditMode, setIsEditMode] = useState();

  useEffect(() => {
    selectedUser &&
      reset({
        ...defaultValues,
        info: { ...defaultValues.info, provider: selectedUser },
      });
  }, [selectedUser]);

  const defaultValues = {
    docName: "test1",
    billNumber: "XXXXXX",
    billDateFrom: Date.parse(now),
    billDate: Date.parse(now),
    billAuthor: "XXX XXXXXXXX XXXXXXXXX",
    details: [
      {
        title: "XXX XXXXXXXX XXXXXXXXX",
        price: 100,
        quantity: 10.0,
        sum: 1000.0,
      },
    ],
    total: "Одна тисяча гривень 00 копійок",
    info: {
      provider: {
        account: "XXXXXXXXXXXXXXXX",
        address: "XXXXXXXXXXXXXXXX",
        bank: "XXXXXXXXXXXXXXXX",
        email: "XXXXXXXXXXXXXXXX",
        entityType: "XXXXXXXXXXXXXXXX",
        name: "XXXXXXXXXXXXXXXX",
        patronym: "XXXXXXXXXXXXXXXX",
        reg: "XXXXXXXXXXXXXXXX",
        surname: "XXXXXXXXXXXXXXXX",
        tel: "XXXXXXXXXXXXXXXX",
      },
      buyer: {
        account: "XXXXXXXXXXXXXXXX",
        address: "XXXXXXXXXXXXXXXX",
        bank: "XXXXXXXXXXXXXXXX",
        email: "XXXXXXXXXXXXXXXX",
        entityType: "XXXXXXXXXXXXXXXX",
        name: "XXXXXXXXXXXXXXXX",
        patronym: "XXXXXXXXXXXXXXXX",
        reg: "XXXXXXXXXXXXXXXX",
        surname: "XXXXXXXXXXXXXXXX",
        tel: "XXXXXXXXXXXXXXXX",
      },
    },
  };
  const { register, handleSubmit, reset, getValues, setValue, control, watch } =
    useForm({
      defaultValues: selectedBill ? selectedBill : defaultValues,
    });

  const { remove, append } = useFieldArray({
    name: "details",
    control,
  });

  const formValues = getValues();

  const watchBillDateFrom = watch("billDateFrom");

  const numberToString = require("number-to-cyrillic");
  numberToString.convert(21);

  const totalWritten = `${
    numberToString.convert(orderTotal).convertedInteger
  } гривень ${numberToString.convert(orderTotal).fractionalString} копійок`;

  const calculateOrderTotal = () => {
    if (formValues && formValues.details) {
      const total = formValues.details.reduce(
        (acc, curr) => Number(curr.sum) + acc,
        0
      );
      setOrderTotal(total);
    }
  };

  useEffect(() => {
    calculateOrderTotal();
  }, [formValues.details]);

  const generatePDF = () => {
    const report = new JsPDF("p", "px", [936, 1300]);
    report.viewerPreferences({ CenterWindow: true }, true);
    report
      .html(document.querySelector("#billDoc"), { margin: [20, 10, 10, 50] })
      .then(() => {
        report.save("bill.pdf");
      });
  };

  const onSubmit = (data) => {
    const billItems = JSON.parse(localStorage.getItem("billDocs"));

    if (!billItems) {
      setBillItems([data]);
      setIsBillAdded(true);
    }
    if (billItems) {
      let index = null;
      const itemExist = billItems.find((item, i) => {
        if (item.docName === data.docName) index = i;
        return item.docName === data.docName;
      });
      if (!itemExist) {
        billItems.push(data);
        setBillItems(billItems);
        setIsBillAdded(true);
      }
      if (itemExist) {
        billItems[index] = data;
        setBillItems(billItems);
        setIsBillUpdated(true);
      }
    }
  };

  const addService = () => {
    append({ title: "XXX XXXXXXXX XXXXXXXXX", price: 0, quantity: 0, sum: 0 });
  };

  return (
    <div css={styles.BillDocContainer}>
      <div css={styles.save}>
        <BaseInput
          classname={styles.saveInput}
          register={register}
          inputName="docName"
          width="250"
        />
        <div css={styles.buttons}>
          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "Зберегти зміни" : "Редагувати"}
          </Button>

          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            type="submit"
            disabled={isEditMode}
          >
            Зберегти
          </Button>
          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            onClick={generatePDF}
            disabled={isEditMode}
          >
            Скачати pdf
          </Button>
        </div>
      </div>
      <form css={styles.billDoc} onSubmit={handleSubmit(onSubmit)} id="billDoc">
        <div css={styles.title}>
          <span>Рахунок-фактура №22-</span>
          <BaseInput
            register={register}
            inputName="billNumber"
            width="80"
            classname={styles.titleFieldBold}
            disabled={!isEditMode}
          />
          <span>від </span>
          <BaseDatePicker
            register={register}
            selected={watchBillDateFrom}
            inputName="billDateFrom"
            classname={styles.titleFieldBold}
            dateFormat="dd.MM.yyyy"
            onChange={(date) => setValue("billDateFrom", date.getTime())}
            disabled={!isEditMode}
          />
        </div>
        <div css={styles.infoContainer}>
          <div css={styles.info}>
            <div css={styles.infoTitle}>
              <span>Постачальник</span>
            </div>
            <div css={styles.infoContent}>
              <div css={styles.infoTitleInput}>
                <span css={styles.fieldBold}>
                  {selectedUser?.entityType === "business"
                    ? `ТОВ ${formValues.info.provider.companyName}`
                    : `ФОП ${formValues.info.provider.surname} 
                  ${formValues.info.provider.name} 
                  ${formValues.info.provider.patronym}`}
                </span>
              </div>
              <div>
                <div css={styles.info}>
                  <div css={styles.fieldBold}>
                    <span>Адреса: </span>
                  </div>
                  <BaseInput
                    register={register}
                    inputName="info.provider.address"
                    width="250"
                    disabled={!isEditMode}
                  />
                </div>
                <div css={styles.info}>
                  <div css={styles.fieldBold}>
                    {selectedUser?.entityType === "business" ? (
                      <span>ЄДРПОУ: </span>
                    ) : (
                      <span style={{ maxWidth: "100px" }}>
                        Реєстраційний номер облікової картки платника податків:{" "}
                      </span>
                    )}
                    <BaseInput
                      register={register}
                      inputName="info.provider.reg"
                      width="250"
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
                <div css={styles.info}>
                  <div css={styles.fieldBold}>
                    <span>E-mail: </span>
                  </div>
                  <BaseInput
                    register={register}
                    inputName="info.provider.email"
                    width="250"
                    disabled={!isEditMode}
                  />
                </div>
                <div css={styles.info}>
                  <div css={styles.fieldBold}>
                    <span>Телефон: </span>
                  </div>
                  <BaseInput
                    register={register}
                    inputName="info.provider.tel"
                    width="250"
                    disabled={!isEditMode}
                  />
                </div>
                <div css={styles.info}>
                  <div css={styles.fieldBold}>
                    <span>Назва банку: </span>
                  </div>
                  <BaseInput
                    register={register}
                    inputName="info.provider.bank"
                    width="250"
                    disabled={!isEditMode}
                  />
                </div>
                <div css={styles.info}>
                  <div css={styles.fieldBold}>
                    <span>Рахунок: </span>
                  </div>
                  <BaseInput
                    register={register}
                    inputName="info.provider.account"
                    width="250"
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </div>
          <div css={styles.info}>
            <div css={styles.infoTitle}>
              <span>Покупець</span>
            </div>
            <div css={styles.infoContent}>
              <span>
                {selectedUser?.entityType === "business"
                  ? `ТОВ ${formValues.info.buyer.companyName}`
                  : `ФОП ${formValues.info.buyer.surname} 
                  ${formValues.info.buyer.name} 
                  ${formValues.info.buyer.patronym}`}
              </span>
              <span>
                {selectedUser?.entityType === "business"
                  ? `ЄДРПОУ ${formValues.info.buyer.reg}`
                  : `Реєстраційний номер облікової картки платника податків: ${formValues.info.buyer.reg}`}
              </span>
            </div>
          </div>
        </div>
        <div css={styles.basis}>
          <span>Підстава:</span>
          <div css={styles.details}>
            <div css={styles.fieldBold}>№</div>
            <div css={styles.fieldBold}>Найменування</div>
            <div css={styles.fieldBold}>Од. вим.</div>
            <div css={styles.fieldBold}>Кількість</div>
            <div css={styles.fieldBold}>Ціна, грн.</div>
            <div css={styles.fieldBold}>Сума, грн.</div>
          </div>

          {formValues.details.map((item, index) => (
            <div key={index} css={styles.details}>
              <div css={styles.fieldBold}>{index + 1}</div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].title`}
                  width="200"
                  classname={styles.fieldBold}
                  disabled={!isEditMode}
                />
              </div>
              <div css={styles.fieldBold}>Година</div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].quantity`}
                  width="70"
                  classname={styles.fieldBold}
                  disabled={!isEditMode}
                  onChange={(e) => {
                    handleTimeChange(e);
                    setValue(
                      `details.${index}.sum`,
                      Number(formValues.details[index].price) *
                        convertStrTimeToNum(e.target.value),
                      { shouldTouch: true }
                    );
                    setValue(`details.${index}.quantity`, e.target.value);
                    calculateOrderTotal();
                  }}
                />
              </div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].price`}
                  width="70"
                  classname={styles.fieldBold}
                  disabled={!isEditMode}
                  type="number"
                  onChange={(e) => {
                    setValue(
                      `details.${index}.sum`,

                      convertStrTimeToNum(formValues.details[index].quantity) *
                        Number(e.target.value),
                      { shouldTouch: true }
                    );
                    setValue(`details.${index}.price`, e.target.value);
                    calculateOrderTotal();
                  }}
                />
              </div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].sum`}
                  width="80"
                  readOnly={true}
                  classname={styles.fieldBold}
                  disabled={!isEditMode}
                />
              </div>

              {isEditMode && (
                <img
                  css={styles.detailsRemoveBtn}
                  onClick={() => remove(index)}
                  src={CloseIcon}
                  alt="remove"
                />
              )}
            </div>
          ))}
          {isEditMode && (
            <Button
              classname={styles.addButton}
              classnameContainer={styles.addButtonContainer}
              type="button"
              onClick={addService}
            >
              Додати сервіс
            </Button>
          )}
          <div css={styles.total}>
            <div>
              <span css={styles.fieldBold}>{orderTotal} грн.</span>
            </div>
            <div>
              <span css={styles.totalColumn}>ПДВ:</span>
              <span css={styles.fieldBold}>без ПДВ</span>
            </div>
          </div>
        </div>
        <div>
          <div css={styles.totalText}>
            <span>До сплати: {totalWritten}, без ПДВ</span>
          </div>
        </div>

        <div css={styles.billAuthor}>
          <div css={styles.billAuthorTitle}>
            <span css={styles.fieldBold}>Рахунок виписав (ла)</span>
          </div>
          <span css={styles.fieldBold}>
            {selectedUser?.entityType === "business"
              ? `ТОВ ${formValues.info.provider.companyName}`
              : `ФОП ${formValues.info.provider.surname} 
                  ${formValues.info.provider.name} 
                  ${formValues.info.provider.patronym}`}
          </span>
        </div>
      </form>
    </div>
  );
}

BillDoc.propTypes = {
  selectedBill: PropTypes.object,
  setBillItems: PropTypes.func,
  setIsBillAdded: PropTypes.func,
  setIsBillUpdated: PropTypes.func,
};

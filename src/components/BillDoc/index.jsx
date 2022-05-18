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
import TextArea from "../UI/TextArea";
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
        info: { ...defaultValues.info, client: selectedUser },
      });
  }, [selectedUser]);

  const defaultValues = {
    docName: "test1",
    billNumber: "XXXXXX",
    billDateFrom: now,
    billDate: now,
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
        title: "XXX XXXXXXXX XXXXXXXXX",
        textField:
          "XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX",
        account: "1234567890-34567890",
        address: "Pivdenna str. 15",
        bank: "PrivatBank",
        email: "test23@gmail.com",
        entityType: "physicalPerson",
        name: "Test",
        patronym: "Testovich",
        reg: "123345",
        surname: "Testenko",
        tel: "0661111111",
      },
      buyer: {
        textField: "XXX XXXXXXXX XXXXXXXXX XXX XXXXXXXX XXXXXXXXX",
      },
    },
  };
  const { register, handleSubmit, reset, getValues, setValue, control } =
    useForm({
      defaultValues: selectedBill ? selectedBill : defaultValues,
    });

  const { remove, append } = useFieldArray({
    name: "details",
    control,
  });

  const formValues = getValues();

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
            inputName="billDateFrom"
            classname={styles.titleFieldBold}
            dateFormat="dd.MM.yyyy"
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
                <BaseInput
                  register={register}
                  inputName="info.provider.title"
                  width="250"
                  classname={styles.fieldBold}
                  disabled={!isEditMode}
                />
              </div>
              <TextArea
                register={register}
                inputName="info.provider.textField"
                width="200"
                height="70"
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div css={styles.info}>
            <div css={styles.infoTitle}>
              <span>Покупець</span>
            </div>
            <div css={styles.infoContent}>
              <TextArea
                register={register}
                inputName="info.buyer.textField"
                width="200"
                height="50s"
                disabled={!isEditMode}
              />
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
          <BaseInput
            register={register}
            inputName="billAuthor"
            width="300"
            classname={styles.fieldBold}
            disabled={!isEditMode}
          />
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

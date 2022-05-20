/** @jsxImportSource @emotion/react */
import JsPDF from "jspdf";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import BaseDatePicker from "../UI/DatePicker/index";
import CloseIcon from "../../assets/close.svg";
import TextArea from "../UI/TextArea/index";
import BaseInput from "../UI/Input/index";
import Button from "components/UI/Button";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function ActOfWorkDoc({
  selectedAct,
  setActOfWork,
  setIsActUpdated,
  setIsActAdded,
  selectedUser,
}) {
  const [isEditMode, setIsEditMode] = useState(true);
  const [orderTotal, setOrderTotal] = useState(0);
  const now = new Date();
  useEffect(() => {
    selectedUser &&
      reset({
        ...defaultValues,
        info: { ...defaultValues.info, client: selectedUser },
      });
  }, [selectedUser]);

  const defaultValues = {
    docName: "test1",
    actNumber: "22-1904_6125",
    contractNumber: "2_17-02/2022",
    contractDateFrom: Date.parse(now),
    actDate: Date.parse(now),
    details: [
      {
        title: "Послуги веб розробки: React та налаштування компонентів",
        units: "Година",
        price: 10.5,
        quantity: "10:30",
        total: "110.25",
      },
    ],
    cost: "105 (сто п'ять грн. 00 коп.)",
    info: {
      client: {
        companyName: "ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «СІНАПС ТІМ»",
        name: "Роман",
        surname: "Барботкін",
        patronym: "Романович",
        address:
          "Україна, 69091, Запорізька обл., місто Запоріжжя, вул. Дунайська, буд.35",
        reg: "42772269",
        email: "roman@synapseteam.com",
        tel: "+380992688071",
        bank: "ЗАПОРІЗЬКЕ РУ АТ КБ 'ПРИВІТБАНК'",
        account: "UA913133990000026001055756583",
      },
      executor: {
        name: "Тест",
        surname: "Тест",
        patronym: "Тестович",
        address:
          "Україна, 58000, Чернівецька обл., місто Чернівці, вул. Небесної сотні, буд.4А",
        reg: "1122334455",
        email: "test@synapseteam.com",
        tel: "+38068111111",
        bank: "AT Super Банк",
        account: "UA11111111111111111111111",
      },
    },
  };
  const { register, control, handleSubmit, getValues, watch, setValue, reset } =
    useForm({
      defaultValues: selectedAct ? selectedAct : defaultValues,
    });

  const onSubmit = (data) => {
    const actOfWork = JSON.parse(localStorage.getItem("actOfWorkDocs"));

    if (!actOfWork) {
      setActOfWork([data]);
      setIsActAdded(true);
    }
    if (actOfWork) {
      let index = null;
      const itemExist = actOfWork.find((item, i) => {
        if (item.docName === data.docName) index = i;
        return item.docName === data.docName;
      });
      if (!itemExist) {
        actOfWork.push(data);
        setActOfWork(actOfWork);
        setIsActAdded(true);
      }
      if (itemExist) {
        actOfWork[index] = data;
        setActOfWork(actOfWork);
        setIsActUpdated(true);
      }
    }
  };

  const numberToString = require("number-to-cyrillic");
  numberToString.convert(21);

  const generatePDF = () => {
    const report = new JsPDF("p", "px", [936, 1300]);
    report.viewerPreferences({ CenterWindow: true }, true);
    report
      .html(document.querySelector("#actOfWork"), { margin: [20, 10, 10, 50] })
      .then(() => {
        report.save("actOfWork.pdf");
      });
  };
  const { append, remove } = useFieldArray({
    name: "details",
    control,
  });

  const formValues = getValues();

  const addService = () => {
    const lastItem =
      formValues.details.length !== 0
        ? formValues.details[formValues.details.length - 1]
        : defaultValues.details[0];
    append({
      title: lastItem.title,
      units: lastItem.units,
      price: lastItem.price,
      quantity: lastItem.quantity,
      total: lastItem.total,
    });
  };

  const calculateOrderTotal = () => {
    if (formValues && formValues.details) {
      const total = formValues.details.reduce(
        (acc, curr) => Number(curr.total) + acc,
        0
      );
      setOrderTotal(total);
    }
  };

  useEffect(() => {
    calculateOrderTotal();
  }, [formValues.details]);

  const totalWritten = ` ${orderTotal} (${
    numberToString.convert(orderTotal).convertedInteger
  } грн. ${numberToString.convert(orderTotal).fractionalString} коп.)`;

  const optionsDate = {
    day: "2-digit",
    weekday: undefined,
    year: "numeric",
    month: "long",
  };

  const milToStringTitleDate = new Date(formValues.contractDateFrom);
  const actDateToTitleString = milToStringTitleDate.toLocaleDateString(
    "uk-UA",
    optionsDate
  );
  const actDateToTitleStringFormat = actDateToTitleString.substring(
    0,
    actDateToTitleString.length - 3
  );
  const milToStringSubtitleDate = new Date(formValues.actDate);
  const actDateToSubtitleString = milToStringSubtitleDate.toLocaleDateString(
    "uk-UA",
    optionsDate
  );
  const actDateToSubtitleStringSplit = actDateToSubtitleString
    .substring(0, actDateToSubtitleString.length - 3)
    .split(" ");

  const actDateToSubtitleStringFormat = `«${actDateToSubtitleStringSplit[0]}» ${actDateToSubtitleStringSplit[1]} ${actDateToSubtitleStringSplit[2]} року`;

  const watchContractDateFrom = watch("contractDateFrom");
  const watchActDate = watch("actDate");

  const clientInitials = `${formValues.info.client.name.charAt(
    0
  )}.${formValues.info.client.patronym.charAt(0)}. ${
    formValues.info.client.surname
  }`;

  const executorInitials = `${formValues.info.executor.name.charAt(
    0
  )}.${formValues.info.executor.patronym.charAt(0)}. ${
    formValues.info.executor.surname
  }`;

  const clientText =
    selectedUser?.entityType === "business"
      ? `${formValues.info.client.companyName}, Україна, 
  в особі директора ${formValues.info.client.surname} 
  ${formValues.info.client.name} ${formValues.info.client.patronym}, 
  який діє на підставі Статуту, `
      : `Фізична особа-підприємець ${formValues.info.client.surname} 
    ${formValues.info.client.name} ${formValues.info.client.patronym} 
    реєстраційний номер облікової картки платника податків 
    ${formValues.info.client.reg}`;

  const executorText = formValues.info.executor.companyName
    ? `${formValues.info.executor.companyName}, Україна, 
    в особі директора ${formValues.info.executor.surname} 
    ${formValues.info.executor.name} ${formValues.info.executor.patronym}, 
    який діє на підставі Статуту, `
    : `Фізична особа-підприємець ${formValues.info.executor.surname} 
    ${formValues.info.executor.name} ${formValues.info.executor.patronym} 
    реєстраційний номер облікової картки платника податків 
    ${formValues.info.executor.reg}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={styles.ActOfWorkDoc}>
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
      <div css={styles.actOfWork} id="actOfWork">
        {isEditMode && (
          <div>
            <div css={styles.title}>
              Акт приймання-передачі №
              <BaseInput register={register} inputName="actNumber" width="95" />
              наданих послуг до договору
              <br />
              №
              <BaseInput
                register={register}
                inputName="contractNumber"
                width="95"
              />
              від{" "}
              <BaseDatePicker
                register={register}
                selected={watchContractDateFrom}
                inputName="contractDateFrom"
                onChange={(date) =>
                  setValue("contractDateFrom", date.getTime())
                }
              />
            </div>
            <div css={styles.subtitle}>
              <div>м. Запоріжжя</div>
              <div>
                <BaseDatePicker
                  register={register}
                  selected={watchActDate}
                  inputName="actDate"
                  dateFormat="«dd» MMMM yyyy року"
                  onChange={(date) => setValue("actDate", date.getTime())}
                />
              </div>
            </div>
          </div>
        )}
        {!isEditMode && (
          <div>
            <div css={styles.title}>
              {`Акт приймання-передачі №${formValues.actNumber}
              наданих послуг до договору`}
              <br />№ {formValues.contractNumber} від
              {actDateToTitleStringFormat}
            </div>
            <div css={styles.subtitle}>
              <div>м. Запоріжжя</div>
              <div>{actDateToSubtitleStringFormat}</div>
            </div>
          </div>
        )}
        <div css={styles.paragraphs}>
          <div css={[styles.paragraphs, styles.indent]}>
            <div>
              {`${clientText}, (надалі - “Замовник”) що діє від імені Замовника, з одного боку, та`}
            </div>
            <div>
              {`${executorText} (надалі “Виконавець”), 
              з іншого боку, підписали цей акт
              приймання-передачі наданих послуг по Договору № ${formValues.contractNumber} від ${actDateToTitleString} про наступне:`}
            </div>
            <div css={styles.paragraphs}>
              Виконавець здав, а Замовник прийняв послуги по розробці
              програмного забезпечення в наступній кількості та вартості:
            </div>
          </div>
        </div>

        <div css={styles.details}>
          <div css={styles.heading}>
            <span css={styles.column1}>№</span>
            <span css={styles.column2}>Найменування</span>
            <span css={styles.column3}>Од. вим.</span>
            <span css={styles.column4}>Ціна, грн.,без ПДВ</span>
            <span css={styles.column5}>Кількість</span>
            <span css={styles.column6}>Вартість, грн., без ПДВ</span>
          </div>

          {isEditMode &&
            formValues.details.map((item, index) => {
              return (
                <div key={index} css={styles.heading}>
                  <span css={styles.column1}> {index + 1}</span>
                  <span css={styles.column2}>
                    <TextArea
                      classname={[styles.fieldBold, styles.textareaSmall]}
                      inputName={`details[${index}].title`}
                      register={register}
                      maxLength={70}
                      height="40"
                    />
                  </span>
                  <span css={styles.column3}>
                    <BaseInput
                      classname={styles.fieldBold}
                      register={register}
                      inputName={`details[${index}].units`}
                    />
                  </span>
                  <span css={styles.column4}>
                    <BaseInput
                      classname={styles.fieldBold}
                      register={register}
                      inputName={`details[${index}].price`}
                      type="number"
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
                  <span css={styles.column5}>
                    <BaseInput
                      classname={styles.fieldBold}
                      register={register}
                      inputName={`details[${index}].quantity`}
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
                  <span css={styles.column6}>
                    <BaseInput
                      register={register}
                      classname={styles.fieldBold}
                      inputName={`details[${index}].total`}
                      readOnly
                    />
                  </span>
                  {isEditMode && (
                    <img
                      css={styles.removeButton}
                      onClick={() => remove(index)}
                      src={CloseIcon}
                      alt="remove"
                    />
                  )}
                </div>
              );
            })}
          {!isEditMode &&
            formValues.details.map((item, index) => {
              return (
                <div key={index} css={styles.heading}>
                  <span css={styles.column1}> {index + 1}</span>
                  <span
                    css={[styles.column2, styles.fieldBold, styles.noEditTitle]}
                  >
                    {formValues.details[index].title}
                  </span>
                  <span css={[styles.column3, styles.fieldBold]}>
                    {formValues.details[index].units}
                  </span>
                  <span css={[styles.column4, styles.fieldBold]}>
                    {formValues.details[index].price}
                  </span>
                  <span css={[styles.column5, styles.fieldBold]}>
                    {formValues.details[index].quantity}
                  </span>
                  <span css={[styles.column6, styles.fieldBold]}>
                    {formValues.details[index].total}
                  </span>
                  {isEditMode && (
                    <img
                      css={styles.removeButton}
                      onClick={() => remove(index)}
                      src={CloseIcon}
                      alt="remove"
                    />
                  )}
                </div>
              );
            })}
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
            <span css={styles.fieldBold}>{orderTotal}</span>
          </div>
        </div>
        <div css={[styles.paragraphs, styles.fieldBold, styles.indent]}>
          <div>
            {`Загальна вартість наданих послуг складає ${totalWritten}, без ПДВ.`}
          </div>
          <div>
            {`Послуги надані вчасно та повному об’ємі. Сторони не мають претензій
            одна до одної з приводу якості наданих послуг.`}
          </div>
        </div>
        <div css={styles.info}>
          <div css={styles.item}>
            <div>
              <div css={styles.fieldBold}>Замовник</div>
              <div css={[styles.fieldBold, styles.infoTitleInput]}>
                {formValues.info.client.companyName}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Адреса: </span>
                {formValues.info.client.address}
              </div>
            </div>

            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>ЄДРПОУ: </span> &nbsp;
                {formValues.info.client.reg}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>E-mail: </span>
                {formValues.info.client.email}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Телефон: </span>
                {formValues.info.client.tel}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Назва банку: </span>
                {formValues.info.client.bank}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Рахунок: </span>
                {formValues.info.client.account}
              </div>
            </div>
            <div css={[styles.initials, styles.fieldBold]}>
              <span css={styles.fieldBold}>_______________ </span>
              {clientInitials}
            </div>
          </div>

          <div css={styles.item}>
            <div>
              <div css={styles.fieldBold}>Виконавець</div>
              <div css={[styles.fieldBold, styles.infoTitleInput]}>
                {formValues.info.executor.surname}{" "}
                {formValues.info.executor.name}{" "}
                {formValues.info.executor.patronym}
              </div>
            </div>

            <div css={styles.infoField}>
              <div css={styles.infoField}>
                <div css={styles.infoFieldNoEdit}>
                  <span css={styles.fieldBold}>Адреса: </span>
                  {formValues.info.executor.address}
                </div>
              </div>
            </div>

            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>
                  Реєстраційний номер облікової картки платника податків:
                </span>{" "}
                {formValues.info.executor.reg}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>E-mail: </span>
                {formValues.info.executor.email}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Телефон: </span>
                {formValues.info.executor.tel}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Назва банку: </span>
                {formValues.info.executor.bank}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Рахунок: </span>
                {formValues.info.executor.account}
              </div>
            </div>
            <div css={[styles.initials, styles.fieldBold]}>
              <span css={styles.fieldBold}>_______________ </span>
              {executorInitials}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

ActOfWorkDoc.propTypes = {
  selectedAct: PropTypes.object,
  setActOfWork: PropTypes.func,
  setIsActUpdated: PropTypes.func,
  setIsActAdded: PropTypes.func,
};

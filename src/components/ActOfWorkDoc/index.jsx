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
}) {
  const [isEditMode, setIsEditMode] = useState();
  const [orderTotal, setOrderTotal] = useState(0);
  const now = new Date();
  useEffect(() => {
    selectedAct && reset(selectedAct);
  }, [selectedAct]);

  const defaultValues = {
    docName: "test1",
    actNumber: "22-1904_6125",
    actDateNumber: "2_17-02/2022",
    actDateTo: now,
    clientСompany: "«СІНАПС ТІМ»",
    clientTextBlock:
      "ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «СІНАПС ТІМ»  , Україна, в особі директора  Барботкіна Романа Романовича, який діє на підставі Статуту, (надалі - “Замовник”) що діє від імені Замовника, з одного боку, та",
    executorTextBlock:
      "Фізична особа-підприємець Іван Іванович Тест, реєстраційний номер облікової картки платника податків 1122334455 (надалі “Виконавець”), з іншого боку, підписали цей акт приймання-передачі наданих послуг по Договору № 2_17-02/2022 від 01 лютого 2022 р. про наступне:",
    clientСompanyDirector: "Барботкіна Романа Романовича",
    details: [
      {
        title: "Послуги веб розробки: React та налаштування компонентів",
        units: "Година",
        price: 10.5,
        quantity: "10:30",
        total: "105",
      },
    ],
    cost: "105 (сто п'ять грн. 00 коп.)",
    info: {
      client: {
        name: "ТОВАРИСТВО З ОБЗЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «СІНАПС ТІМ»",
        address1: "Україна, 69091, Запорізька обл., ",
        address2: "місто Запоріжжя, вул. Дунайська, буд.35",
        reg: "42772269",
        email: "roman@synapseteam.com",
        tel: "+380992688071",
        bank: "ЗАПОРІЗЬКЕ РУ АТ КБ 'ПРИВІТБАНК'",
        account: "UA913133990000026001055756583",
        initials: "Р.Р. Барботкін",
      },
      executor: {
        name: "Іван Іванович Тест",
        address1: "Україна, 58000, Чернівецька обл., ",
        address2: "місто Чернівці, вул. Небесної сотні, буд.4А",
        reg: "1122334455",
        email: "test@synapseteam.com",
        tel: "+38068111111",
        bank: "AT Super Банк",
        account: "UA11111111111111111111111",
        initials: "І.І. Тест",
      },
    },
  };
  const { register, control, handleSubmit, getValues, setValue, reset } =
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

  const formValues = getValues();

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

  const addService = () => {
    append({ title: "", price: 0, time: 0, total: 0 });
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
    day: "numeric",
    weekday: undefined,
    year: "numeric",
    month: "long",
  };
  const actDateToTitleString = formValues.actDateTo.toLocaleDateString(
    "uk-UA",
    optionsDate
  );
  const actDateToTitleStringFormat = actDateToTitleString.substring(
    0,
    actDateToTitleString.length - 3
  );

  const actDateToSubtitleString = formValues.actDateTo.toLocaleDateString(
    "uk-UA",
    optionsDate
  );
  const actDateToSubtitleStringSplit = actDateToSubtitleString
    .substring(0, actDateToSubtitleString.length - 3)
    .split(" ");
  const actDateToSubtitleStringFormat = `«${actDateToSubtitleStringSplit[0]}» ${actDateToSubtitleStringSplit[1]} ${actDateToSubtitleStringSplit[2]} року`;

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
            Редагувати
          </Button>
          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            type="submit"
          >
            Зберегти
          </Button>

          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            onClick={generatePDF}
            disabled={!isEditMode}
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
                inputName="actDateNumber"
                width="95"
              />
              від <BaseDatePicker register={register} inputName="actDateTo" />
            </div>
            <div css={styles.subtitle}>
              <div>м. Запоріжжя</div>
              <div>
                <BaseDatePicker
                  register={register}
                  inputName="actDateTo"
                  dateFormat="«dd» MMMM yyyy року"
                />
              </div>
            </div>
          </div>
        )}
        {!isEditMode && (
          <div>
            <div css={styles.title}>
              Акт приймання-передачі №{formValues.actNumber} {""}
              наданих послуг до договору
              <br />№ {formValues.actDateNumber} від {""}
              {actDateToTitleStringFormat}
            </div>
            <div css={styles.subtitle}>
              <div>м. Запоріжжя</div>
              <div>{actDateToSubtitleStringFormat}</div>
            </div>
          </div>
        )}
        {isEditMode && (
          <div css={styles.paragraphs}>
            <TextArea
              classname={[styles.textarea, styles.indent]}
              height="55"
              register={register}
              inputName="clientTextBlock"
            />
            <TextArea
              classname={[styles.textarea, styles.indent]}
              register={register}
              height="75"
              inputName="executorTextBlock"
            />

            <div css={[styles.paragraphs, styles.indent]}>
              Виконавець здав, а Замовник прийняв послуги по розробці
              програмного забезпечення в наступній кількості та вартості:
            </div>
          </div>
        )}
        {!isEditMode && (
          <div css={[styles.paragraphs, styles.indent]}>
            <div>{formValues.clientTextBlock}</div>
            <div>{formValues.executorTextBlock}</div>
            <div css={[styles.paragraphs, styles.indent]}>
              Виконавець здав, а Замовник прийняв послуги по розробці
              програмного забезпечення в наступній кількості та вартості:
            </div>
          </div>
        )}
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
                      maxLength={100}
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
                      onChange={(e) => {
                        handleTimeChange(e);
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
                  <span css={[styles.column2, styles.fieldBold]}>
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
          Загальна вартість наданих послуг складає{totalWritten}, без ПДВ.
          <div>
            Послуги надані вчасно та повному об’ємі. Сторони не мають претензій
            одна до одної з приводу якості наданих послуг.
          </div>
        </div>
        <div css={styles.info}>
          <div css={styles.item}>
            <div>
              <div css={styles.fieldBold}>Замовник</div>
              <BaseInput
                register={register}
                classname={[styles.fieldBold, styles.infoTitleInput]}
                inputName="info.client.name"
              />
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoAddressField}>
                <div css={styles.infoField}>
                  <span css={styles.fieldBold}>Адреса:</span>
                  <BaseInput
                    register={register}
                    inputName="info.client.address1"
                  />
                </div>
                <div>
                  <BaseInput
                    register={register}
                    inputName="info.client.address2"
                  />
                </div>
              </div>
            </div>

            <div css={styles.infoField}>
              <span css={styles.fieldBold}>ЄДРПОУ:</span>
              <BaseInput register={register} inputName="info.client.reg" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>E-mail:</span>
              <BaseInput register={register} inputName="info.client.email" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>Телефон:</span>
              <BaseInput register={register} inputName="info.client.tel" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>Назва банку:</span>
              <BaseInput register={register} inputName="info.client.bank" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>Рахунок:</span>
              <BaseInput register={register} inputName="info.client.account" />
            </div>
            <div css={styles.initials}>
              <span css={styles.fieldBold}>_______________</span>
              <BaseInput
                register={register}
                classname={styles.fieldBold}
                inputName="info.client.initials"
              />
            </div>
          </div>
          <div css={styles.item}>
            <div css={styles.fieldBold}>Виконавець</div>
            <BaseInput
              register={register}
              classname={[styles.fieldBold, styles.infoTitleInput]}
              inputName="info.executor.name"
            />

            <div css={styles.infoField}>
              <div css={styles.infoAddressField}>
                <div css={styles.infoField}>
                  <span css={styles.fieldBold}>Адреса:</span>
                  <BaseInput
                    register={register}
                    inputName="info.executor.address1"
                  />
                </div>
                <div>
                  <BaseInput
                    register={register}
                    inputName="info.executor.address2"
                  />
                </div>
              </div>
            </div>

            <div>
              <span css={styles.fieldBold}>
                Реєстраційний номер облікової картки платника податків:
              </span>
              <BaseInput register={register} inputName="info.executor.reg" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>E-mail:</span>
              <BaseInput register={register} inputName="info.executor.email" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>Телефон:</span>
              <BaseInput register={register} inputName="info.executor.tel" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>Назва банку:</span>
              <BaseInput register={register} inputName="info.executor.tel" />
            </div>
            <div css={styles.infoField}>
              <span css={styles.fieldBold}>Рахунок:</span>
              <BaseInput
                register={register}
                inputName="info.executor.account"
              />
            </div>
            <div css={styles.initials}>
              <span css={styles.fieldBold}>_______________</span>
              <BaseInput
                register={register}
                classname={styles.fieldBold}
                inputName="info.executor.initials"
              />
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

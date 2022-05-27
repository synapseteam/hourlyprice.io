/** @jsxImportSource @emotion/react */
import JsPDF from "jspdf";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import BaseDatePicker from "../UI/DatePicker/index";
import CloseIcon from "../../assets/close.svg";
import CopyIcon from "../../assets/copy-black.png";
import ReactTooltip from "react-tooltip";
import CopyIconWhite from "../../assets/copy-white.png";
import TextArea from "../UI/TextArea/index";
import BaseInput from "../UI/Input/index";
import Button from "components/UI/Button";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import { useEffect, useState, useRef, SyntheticEvent } from "react";
import { styles } from "./styles";
import { IActDoc, IActInfoUser } from "typescript/interfaces";
interface Props {
  selectedUser: IActInfoUser;
  isDark: boolean;
}

const ActOfWorkDoc: React.FC<Props> = ({ selectedUser, isDark }) => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [isEditInputShown, setIsEditInputShown] = useState<boolean>(false);
  const [editInputName, setEditInputName] = useState<any>("");
  const [editInputPosition, setEditInputPosition] = useState<number[]>([]);
  const [editedValue, setEditedValue] = useState<string>("");

  const now = new Date();

  useEffect(() => {
    selectedUser &&
      reset({
        ...defaultValues,
        info: { ...defaultValues.info, client: selectedUser },
      });
  }, [selectedUser]);

  const defaultValues: IActDoc = {
    docName: "test1",
    city: "м. Запоріжжя",
    actNumber: "22-1904_6125",
    contractNumber: "2_17-02/2022",
    contractDateFrom: Date.parse(now.toString()),
    actDate: Date.parse(now.toString()),
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
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (isDirty) {
      window.addEventListener("beforeunload", alertUser);
    }
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [isDirty]);

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const onSubmit = (data: IActDoc) => {
    console.log(data);
  };

  const numberToString = require("number-to-cyrillic");
  numberToString.convert(21);

  const generatePDF = () => {
    const report = new JsPDF("p", "px", [936, 1300]);
    report.viewerPreferences({ CenterWindow: true }, true);
    report
      .html(document.getElementById("#actOfWork")!, {
        margin: [20, 10, 10, 50],
      })
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
    append({
      title: "",
      units: "",
      price: 0,
      quantity: "",
      total: "",
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

  const onStartEdit = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    value: string
  ): void => {
    if (!isEditInputShown) {
      setIsEditInputShown(true);
      setEditInputName(value);
      setEditInputPosition([
        e.currentTarget.offsetLeft,
        e.currentTarget.offsetTop - 35,
      ]);
    }
  };

  const onChangeEdit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedValue(e.currentTarget.value);
  };

  const onFinishEdit = (): void => {
    setEditInputName("");
    setValue(
      editInputName,
      editedValue !== "" ? editedValue : getValues(editInputName),
      { shouldDirty: true }
    );
    setEditedValue("");
    setIsEditInputShown(false);
  };

  const optionsDate: Intl.DateTimeFormatOptions = {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={styles.ActOfWorkDoc}>
      {isEditInputShown && (
        <span
          css={styles.editInput}
          style={{
            position: "absolute",
            left: editInputPosition[0],
            top: editInputPosition[1],
          }}
        >
          <BaseInput
            register={register}
            width={250}
            inputName={editInputName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeEdit(e)
            }
          />
          <span>
            <Button
              type="submit"
              classname={styles.editButton}
              classnameContainer={styles.editButtonContainer}
              onClick={onFinishEdit}
            >
              ✓
            </Button>
          </span>
        </span>
      )}

      <div css={styles.save}>
        <BaseInput
          classname={styles.saveInput}
          register={register}
          inputName="docName"
          width={250}
        />
        <div css={styles.buttons}>
          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            type="submit"
            disabled={!isDirty}
          >
            Зберегти
          </Button>
          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            onClick={generatePDF}
          >
            Скачати pdf
          </Button>
          <ReactTooltip place="bottom" effect="solid" />
          <Button
            classnameContainer={styles.copyButtonContainer}
            classname={styles.copyButton}
            dataTip={"Скопіювати дані з рахунок-фактури"}
          >
            <img
              css={styles.copyButtonIcon}
              src={isDark ? CopyIconWhite : CopyIcon}
              alt="copy"
            />
          </Button>
        </div>
      </div>
      <div css={styles.actOfWork} id="actOfWork">
        <div>
          <div css={styles.title}>
            Акт приймання-передачі №
            <span
              onClick={(e) => onStartEdit(e, "actNumber")}
              data-comp="hover"
            >
              {formValues.actNumber}
            </span>{" "}
            наданих послуг до договору
            <br />№
            <span
              onClick={(e) => onStartEdit(e, "contractNumber")}
              data-comp="hover"
            >
              {formValues.contractNumber}
            </span>{" "}
            {formValues.contractNumber} від{" "}
            <BaseDatePicker
              register={register}
              selected={watchContractDateFrom}
              inputName="contractDateFrom"
              onChange={(date) =>
                setValue("contractDateFrom", date.getTime(), {
                  shouldDirty: true,
                })
              }
            />
          </div>
          <div css={styles.subtitle}>
            <div onClick={(e) => onStartEdit(e, "city")}>{formValues.city}</div>
            <div>
              <BaseDatePicker
                register={register}
                selected={watchActDate}
                inputName="actDate"
                dateFormat="«dd» MMMM yyyy року"
                onChange={(date) =>
                  setValue("actDate", date.getTime(), { shouldDirty: true })
                }
              />
            </div>
          </div>
        </div>
        <div css={styles.paragraphs}>
          <div css={[styles.paragraphs, styles.indent]}>
            <div>
              {selectedUser?.entityType === "business" && (
                <>
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.companyName")}
                    data-comp="hover"
                  >
                    {formValues.info.client.companyName}
                  </span>{" "}
                  , Україна, в особі директора{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.surname")}
                    data-comp="hover"
                  >
                    {formValues.info.client.surname}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.name")}
                    data-comp="hover"
                  >
                    {formValues.info.client.name}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.patronym")}
                    data-comp="hover"
                  >
                    {formValues.info.client.patronym}
                  </span>{" "}
                  який діє на підставі Статуту,
                </>
              )}
              {selectedUser?.entityType !== "business" && (
                <>
                  Фізична особа-підприємець{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.surname")}
                    data-comp="hover"
                  >
                    {formValues.info.client.surname}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.name")}
                    data-comp="hover"
                  >
                    {formValues.info.client.name}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.patronym")}
                    data-comp="hover"
                  >
                    {formValues.info.client.patronym}
                  </span>{" "}
                  реєстраційний номер облікової картки платника податків{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.client.reg")}
                    data-comp="hover"
                  >
                    {formValues.info.client.reg}
                  </span>{" "}
                </>
              )}
              , (надалі - <strong>“Замовник”</strong> ) що діє від імені
              Замовника, з одного боку, та
            </div>
            <div>
              {formValues.info.executor.companyName && (
                <>
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.companyName")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.companyName}
                  </span>{" "}
                  , Україна, в особі директора
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.surname")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.surname}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.name")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.name}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.patronym")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.patronym}
                  </span>{" "}
                  який діє на підставі Статуту,{" "}
                </>
              )}
              {!formValues.info.executor.companyName && (
                <>
                  Фізична особа-підприємець{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.surname")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.surname}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.name")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.name}
                  </span>{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.patronym")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.patronym}
                  </span>{" "}
                  реєстраційний номер облікової картки платника податків{" "}
                  <span
                    css={styles.fieldBold}
                    onClick={(e) => onStartEdit(e, "info.executor.reg")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.reg}
                  </span>{" "}
                </>
              )}
              (надалі <strong>“Виконавець”</strong> ), з іншого боку, підписали
              цей акт приймання-передачі наданих послуг по договору{" "}
              <strong> № </strong>
              <span
                css={styles.fieldBold}
                onClick={(e) => onStartEdit(e, "contractNumber")}
                data-comp="hover"
              >
                {formValues.contractNumber}
              </span>{" "}
              <strong> від {actDateToTitleString} </strong>
              про наступне:
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

          {formValues.details.map((item, index) => {
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
                        ).toFixed(2),
                        { shouldDirty: true }
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
                        ).toFixed(2),
                        { shouldDirty: true }
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
                <img
                  css={styles.removeButton}
                  onClick={() => remove(index)}
                  src={CloseIcon}
                  alt="remove"
                />
              </div>
            );
          })}

          <Button
            classname={styles.addButton}
            classnameContainer={styles.addButtonContainer}
            type="button"
            onClick={addService}
          >
            Додати сервіс
          </Button>
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
              <div
                css={[styles.fieldBold, styles.infoTitleInput]}
                onClick={(e) => onStartEdit(e, "info.client.companyName")}
                data-comp="hover"
              >
                {formValues.info.client.companyName}
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Адреса: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.client.address")}
                  data-comp="hover"
                >
                  {formValues.info.client.address}
                </span>
              </div>
            </div>

            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>ЄДРПОУ: </span> &nbsp;
                <span
                  onClick={(e) => onStartEdit(e, "info.client.reg")}
                  data-comp="hover"
                >
                  {formValues.info.client.reg}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>E-mail: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.client.email")}
                  data-comp="hover"
                >
                  {formValues.info.client.email}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Телефон: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.client.tel")}
                  data-comp="hover"
                >
                  {formValues.info.client.tel}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Назва банку: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.client.bank")}
                  data-comp="hover"
                >
                  {formValues.info.client.bank}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Рахунок: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.client.account")}
                  data-comp="hover"
                >
                  {formValues.info.client.account}
                </span>
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
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.surname")}
                  data-comp="hover"
                >
                  {formValues.info.executor.surname}{" "}
                </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.name")}
                  data-comp="hover"
                >
                  {formValues.info.executor.name}{" "}
                </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.patronym")}
                  data-comp="hover"
                >
                  {formValues.info.executor.patronym}
                </span>
              </div>
            </div>

            <div css={styles.infoField}>
              <div css={styles.infoField}>
                <div css={styles.infoFieldNoEdit}>
                  <span css={styles.fieldBold}>Адреса: </span>
                  <span
                    onClick={(e) => onStartEdit(e, "info.executor.address")}
                    data-comp="hover"
                  >
                    {formValues.info.executor.address}
                  </span>
                </div>
              </div>
            </div>

            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>
                  Реєстраційний номер облікової картки платника податків:
                </span>{" "}
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.reg")}
                  data-comp="hover"
                >
                  {formValues.info.executor.reg}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>E-mail: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.email")}
                  data-comp="hover"
                >
                  {formValues.info.executor.email}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Телефон: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.tel")}
                  data-comp="hover"
                >
                  {formValues.info.executor.tel}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Назва банку: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.bank")}
                  data-comp="hover"
                >
                  {formValues.info.executor.bank}
                </span>
              </div>
            </div>
            <div css={styles.infoField}>
              <div css={styles.infoFieldNoEdit}>
                <span css={styles.fieldBold}>Рахунок: </span>
                <span
                  onClick={(e) => onStartEdit(e, "info.executor.account")}
                  data-comp="hover"
                >
                  {formValues.info.executor.account}
                </span>
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
};

export default ActOfWorkDoc;

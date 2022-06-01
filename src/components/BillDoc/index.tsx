/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import JsPDF from "jspdf";
import { convertStrTimeToNum, handleTimeChange } from "utils/generic";
import BaseInput from "../UI/Input";
import BaseDatePicker from "../UI/DatePicker";
import Button from "../UI/Button";
import ReactTooltip from "react-tooltip";
import CopyIcon from "../../assets/copy-black.png";
import CopyIconWhite from "../../assets/copy-white.png";
import CloseIcon from "../../assets/close.svg";
import { styles } from "./styles";
import { styles as actOfWorkStyles } from "../ActOfWorkDoc/styles";
import { IActInfoUser, IDetails } from "typescript/interfaces";

interface Props {
  selectedUser: IActInfoUser;
  isDark: boolean;
}
const BillDoc: React.FC<Props> = ({ selectedUser, isDark }): JSX.Element => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [isEditInputShown, setIsEditInputShown] = useState<boolean>(false);
  const [editInputName, setEditInputName] = useState<string>("");
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

  const defaultValues: FieldValues = {
    docName: "test1",
    actNumber: "XXXXXX",
    contractDateFrom: Date.parse(now.toString()),
    actDate: Date.parse(now.toString()),
    billAuthor: "XXX XXXXXXXX XXXXXXXXX",
    details: [
      {
        title: "XXX XXXXXXXX XXXXXXXXX",
        units: "Година",
        price: 100,
        quantity: "10.0",
        total: "1000.0",
      },
    ],
    cost: "Одна тисяча гривень 00 копійок",
    info: {
      client: {
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
      executor: {
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
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { isDirty },
    watch,
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

  const { remove, append } = useFieldArray({
    name: "details",
    control,
  });

  const formValues = getValues();

  const watchBillDateFrom = watch("contractDateFrom");

  const numberToString = require("number-to-cyrillic");
  numberToString.convert(21);

  const totalWritten = `${
    numberToString.convert(orderTotal).convertedInteger
  } гривень ${numberToString.convert(orderTotal).fractionalString} копійок`;

  const calculateOrderTotal = () => {
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

  const generatePDF = () => {
    const report = new JsPDF("p", "px", [936, 1300]);
    report.viewerPreferences({ CenterWindow: true }, true);
    report
      .html(document.getElementById("#billDoc"), { margin: [20, 10, 10, 50] })
      .then(() => {
        report.save("bill.pdf");
      });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const addService = () => {
    append({
      title: "XXX XXXXXXXX XXXXXXXXX",
      price: 0,
      units: "",
      quantity: "",
      total: "",
    });
  };

  const onStartEdit = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    value: string
  ) => {
    if (!isEditInputShown) {
      setIsEditInputShown(true);
      setEditInputName(value);
      setEditInputPosition([
        e.currentTarget.offsetLeft,
        e.currentTarget.offsetTop - 35,
      ]);
    }
  };

  const onChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.currentTarget.value);
  };

  const onFinishEdit = () => {
    setEditInputName("");
    setValue(
      editInputName,
      editedValue !== "" ? editedValue : getValues(editInputName),
      { shouldDirty: true }
    );
    setEditedValue("");
    setIsEditInputShown(false);
  };

  return (
    <div css={styles.BillDocContainer}>
      <div css={actOfWorkStyles.save}>
        <BaseInput
          classname={actOfWorkStyles.saveInput}
          register={register}
          inputName="docName"
          width={250}
        />
        <div css={actOfWorkStyles.buttons}>
          <Button
            classname={actOfWorkStyles.saveButton}
            classnameContainer={actOfWorkStyles.saveButtonContainer}
            type="submit"
            disabled={!isDirty}
          >
            Зберегти
          </Button>
          <Button
            classname={actOfWorkStyles.saveButton}
            classnameContainer={actOfWorkStyles.saveButtonContainer}
            onClick={generatePDF}
          >
            Скачати pdf
          </Button>
          <Button
            classnameContainer={actOfWorkStyles.copyButtonContainer}
            classname={actOfWorkStyles.copyButton}
            dataTip={"Скопіювати дані з акту виконаних робіт"}
          >
            <img
              css={actOfWorkStyles.copyButtonIcon}
              src={isDark ? CopyIconWhite : CopyIcon}
              alt="copy"
            />
            <ReactTooltip place="bottom" effect="solid" />
          </Button>
        </div>
      </div>
      <form css={styles.billDoc} onSubmit={handleSubmit(onSubmit)} id="billDoc">
        {isEditInputShown && (
          <span
            css={actOfWorkStyles.editInput}
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
              onChange={(e) => onChangeEdit(e)}
            />
            <span>
              <Button
                type="submit"
                classname={actOfWorkStyles.editButton}
                classnameContainer={actOfWorkStyles.editButtonContainer}
                onClick={onFinishEdit}
              >
                ✓
              </Button>
            </span>
          </span>
        )}

        <div css={styles.title}>
          <span>Рахунок-фактура №22-</span>
          <span
            css={styles.titleFieldBold}
            onClick={(e) => onStartEdit(e, "actNumber")}
            data-comp="hover"
          >
            {formValues.actNumber}
          </span>{" "}
          <span>від </span>
          <BaseDatePicker
            register={register}
            selected={watchBillDateFrom}
            inputName="contractDateFrom"
            classname={styles.titleFieldBold}
            dateFormat="dd.MM.yyyy"
            onChange={(date: Date) =>
              setValue("contractDateFrom", date.getTime(), {
                shouldDirty: true,
              })
            }
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
                    ? `ТОВ ${formValues.info.client.companyName}`
                    : `ФОП ${formValues.info.client.surname} 
                  ${formValues.info.client.name} 
                  ${formValues.info.client.patronym}`}
                </span>
              </div>
              <div>
                <div css={styles.info}>
                  <div>
                    <span css={styles.fieldBold}>Адреса:</span>{" "}
                    <span
                      onClick={(e) => onStartEdit(e, "info.client.address")}
                      data-comp="hover"
                    >
                      {formValues.info.client.address}
                    </span>{" "}
                  </div>{" "}
                </div>
                <div css={styles.info}>
                  <div>
                    {selectedUser?.entityType === "business" ? (
                      <span css={styles.fieldBold}>ЄДРПОУ: </span>
                    ) : (
                      <span
                        css={styles.fieldBold}
                        style={{ maxWidth: "100px" }}
                      >
                        Реєстраційний номер облікової картки платника податків:{" "}
                      </span>
                    )}
                    <span
                      onClick={(e) => onStartEdit(e, "info.client.reg")}
                      data-comp="hover"
                    >
                      {formValues.info.client.reg}
                    </span>
                  </div>
                </div>
                <div css={styles.info}>
                  <div>
                    <span css={styles.fieldBold}>E-mail: </span>
                    <span
                      onClick={(e) => onStartEdit(e, "info.client.email")}
                      data-comp="hover"
                    >
                      {formValues.info.client.email}
                    </span>{" "}
                  </div>
                </div>
                <div css={styles.info}>
                  <div>
                    <span css={styles.fieldBold}>Телефон: </span>
                    <span
                      onClick={(e) => onStartEdit(e, "info.client.tel")}
                      data-comp="hover"
                    >
                      {formValues.info.client.tel}
                    </span>{" "}
                  </div>
                </div>
                <div css={styles.info}>
                  <div>
                    <span css={styles.fieldBold}>Назва банку: </span>
                    <span
                      onClick={(e) => onStartEdit(e, "info.client.bank")}
                      data-comp="hover"
                    >
                      {formValues.info.client.bank}
                    </span>{" "}
                  </div>
                </div>
                <div css={styles.info}>
                  <div>
                    <span css={styles.fieldBold}>Рахунок: </span>
                    <span
                      onClick={(e) => onStartEdit(e, "info.client.bank")}
                      data-comp="hover"
                    >
                      {formValues.info.client.bank}
                    </span>{" "}
                  </div>
                  <span
                    onClick={(e) => onStartEdit(e, "info.client.account")}
                    data-comp="hover"
                  >
                    {formValues.info.client.account}
                  </span>{" "}
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
                  ? `ТОВ ${formValues.info.executor.companyName}`
                  : `ФОП ${formValues.info.executor.surname} 
                  ${formValues.info.executor.name} 
                  ${formValues.info.executor.patronym}`}
              </span>
              <span>
                {selectedUser?.entityType === "business"
                  ? `ЄДРПОУ ${formValues.info.executor.reg}`
                  : `Реєстраційний номер облікової картки платника податків: ${formValues.info.executor.reg}`}
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

          {formValues.details.map((item: IDetails, index: number) => (
            <div key={index} css={styles.details}>
              <div css={styles.fieldBold}>{index + 1}</div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].title`}
                  width={200}
                  classname={styles.fieldBold}
                />
              </div>
              <BaseInput
                classname={styles.fieldBold}
                width={70}
                register={register}
                inputName={`details[${index}].units`}
              />
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].quantity`}
                  width={70}
                  classname={styles.fieldBold}
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
                    setValue(`details.${index}.quantity`, e.target.value);
                    calculateOrderTotal();
                  }}
                />
              </div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].price`}
                  width={70}
                  classname={styles.fieldBold}
                  type="number"
                  onChange={(e) => {
                    setValue(
                      `details.${index}.total`,
                      (
                        convertStrTimeToNum(
                          formValues.details[index].quantity
                        ) * Number(e.target.value)
                      ).toFixed(2),
                      { shouldDirty: true }
                    );
                    setValue(`details.${index}.price`, Number(e.target.value));
                    calculateOrderTotal();
                  }}
                />
              </div>
              <div>
                <BaseInput
                  register={register}
                  inputName={`details[${index}].total`}
                  width={80}
                  readOnly={true}
                  classname={styles.fieldBold}
                />
              </div>

              <img
                css={styles.detailsRemoveBtn}
                onClick={() => remove(index)}
                src={CloseIcon}
                alt="remove"
              />
            </div>
          ))}
          <Button
            classname={styles.addButton}
            classnameContainer={styles.addButtonContainer}
            type="button"
            onClick={addService}
          >
            Додати сервіс
          </Button>
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
              ? `ТОВ ${formValues.info.client.companyName}`
              : `ФОП ${formValues.info.client.surname} 
                  ${formValues.info.client.name} 
                  ${formValues.info.client.patronym}`}
          </span>
        </div>
      </form>
    </div>
  );
};

export default BillDoc;

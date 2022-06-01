/** @jsxImportSource @emotion/react */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "components/UI/Select";
import InputLabel from "components/UI/InputLabel";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { styles } from "./styles";
import Button from "components/UI/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const entityTypeOptions = [
  { value: "physicalPerson", name: "Фізична особа" },
  { value: "business", name: "Підприємство" },
];

interface Props {
  type?: "clientModal" | "executorModal";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedFields?: any; // TODO check any
}

const ClientForm: React.FC<Props> = ({ type, selectedFields }): JSX.Element => {
  const [entityType, setEntityType] = useState("physicalPerson");

  const [t] = useTranslation();

  const requiredText = "Поле обов'язкове для заповнення";

  const schema = yup.object().shape({
    name: yup.string().required(requiredText),
    surname: yup.string().required(requiredText),
    patronym: yup.string().required(requiredText),
    address: yup.string().required(requiredText),
    reg: yup.string().required(requiredText),
    email: yup.string().email(t("emailError")).required(t("requiredEmail")),
    tel: yup.string().required(requiredText),
    bank: yup.string().required(requiredText),
    account: yup.string().required(requiredText),
    entityType: yup.string().required(requiredText),
    companyName: yup.string().required(requiredText),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: selectedFields && selectedFields,
  });

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      {type === "clientModal" && <h1 css={styles.title}>Замовник</h1>}
      {type === "executorModal" && <h1 css={styles.title}>Клієнт</h1>}
      <Select
        labelName="Тип сутності"
        inputName="entityType"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        changeHandler={(e) => setEntityType(e.currentTarget.value)}
        value={entityType}
        optionsArr={entityTypeOptions}
        errors={errors}
      />
      {entityType === "business" && (
        <InputLabel
          inputName="companyName"
          labelName="Назва компанії"
          classname={styles.input}
          classnameLabel={styles.inputLabel}
          register={register}
          placeholder="Введіть назву компанії"
          errors={errors}
        />
      )}
      <InputLabel
        inputName="surname"
        labelName="Прізвище"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder="Введіть Прізвище"
        errors={errors}
      />
      <InputLabel
        inputName="name"
        labelName="Ім’я"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder="Введіть ім’я"
        errors={errors}
      />
      <InputLabel
        inputName="patronym"
        labelName="По батькові"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder="Введіть по батькові"
        errors={errors}
      />
      <InputLabel
        inputName="email"
        labelName={t("email")}
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="tel"
        labelName="Номер телефону"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder="Введіть номер телефону"
        errors={errors}
      />
      {entityType === "physicalPerson" && (
        <InputLabel
          inputName="reg"
          labelName="РНОКПП"
          register={register}
          classname={styles.input}
          classnameLabel={styles.inputLabel}
          placeholder="Введіть РНОКПП"
          errors={errors}
        />
      )}
      {entityType === "business" && (
        <InputLabel
          inputName="reg"
          labelName="ЄДРПОУ"
          register={register}
          classname={styles.input}
          classnameLabel={styles.inputLabel}
          placeholder="Введіть ЄДРПОУ"
          errors={errors}
        />
      )}

      <InputLabel
        inputName="bank"
        labelName="Назва банку"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder="Введіть назву банку"
        errors={errors}
      />
      <InputLabel
        inputName="account"
        labelName="Рахунок"
        register={register}
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        placeholder="Введіть рахунок"
        errors={errors}
      />
      <InputLabel
        inputName="address"
        labelName="Адреса"
        classname={styles.input}
        classnameLabel={styles.inputLabel}
        register={register}
        placeholder="Введіть адресу"
        errors={errors}
      />

      <Button type="submit">Зберегти</Button>
    </form>
  );
};

export default ClientForm;

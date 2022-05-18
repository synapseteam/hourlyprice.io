/** @jsxImportSource @emotion/react */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "components/UI/Select";
import InputLabel from "components/UI/InputLabel";
import { useCustomTranslation } from "i18n";
import { useForm } from "react-hook-form";
import { styles } from "./styles";
import Button from "components/UI/Button";
import { useState } from "react";

const entityTypeOptions = [
  { value: "physicalPerson", label: "Фізична особа" },
  { value: "business", label: "Підприємство" },
];

interface Props {
  type?: "clientModal" | "executorModal";
  selectedFields?: any;
}

const ClientForm: React.FC<Props> = ({ type, selectedFields }): JSX.Element => {
  const [entityType, setEntityType] = useState("physicalPerson");

  const [t] = useCustomTranslation();

  const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    patronym: yup.string().required(),
    address: yup.string().required(),
    reg: yup.string().required(),
    email: yup.string().email(t("emailError")).required(t("requiredEmail")),
    tel: yup.string().required(),
    bank: yup.string().required(),
    account: yup.string().required(),
    entityType: yup.string().required(),
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

  const submitForm = async (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      {type === "clientModal" && <h1 css={styles.title}>Замовник</h1>}
      {type === "executorModal" && <h1 css={styles.title}>Клієнт</h1>}
      <div css={styles.itemName}>
        <InputLabel
          inputName="surname"
          labelName="Прізвище"
          register={register}
          classname={styles.input}
          placeholder="Введіть Прізвище"
          errors={errors}
        />
        <InputLabel
          inputName="name"
          labelName="Ім’я"
          register={register}
          classname={styles.input}
          placeholder="Введіть ім’я"
          errors={errors}
        />
        <InputLabel
          inputName="patronym"
          labelName="По батькові"
          register={register}
          classname={styles.input}
          placeholder="Введіть по батькові"
          errors={errors}
        />
        <InputLabel
          inputName="email"
          labelName={t("email")}
          register={register}
          classname={styles.input}
          placeholder={t("emailPlaceholder")}
          errors={errors}
        />
      </div>
      <div css={styles.itemSmall}>
        <InputLabel
          inputName="tel"
          labelName="Номер телефону"
          register={register}
          classname={styles.input}
          placeholder="Введіть номер телефону"
          errors={errors}
        />
        {entityType === "physicalPerson" && (
          <InputLabel
            inputName="reg"
            labelName="РНОКПП"
            register={register}
            classname={styles.input}
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
            placeholder="Введіть ЄДРПОУ"
            errors={errors}
          />
        )}
        <Select
          labelName="Тип сутності"
          inputName="entityType"
          register={register}
          changeHandler={(e) => setEntityType(e.currentTarget.value)}
          value={entityType}
          optionsArr={entityTypeOptions}
          errors={errors}
        />
      </div>

      <div css={styles.item}>
        <InputLabel
          inputName="bank"
          labelName="Назва банку"
          register={register}
          classname={styles.input}
          placeholder="Введіть назву банку"
          errors={errors}
        />
        <InputLabel
          inputName="account"
          labelName="Рахунок"
          register={register}
          classname={styles.input}
          placeholder="Введіть рахунок"
          errors={errors}
        />
      </div>
      <div css={styles.itemLarge}>
        <InputLabel
          inputName="address"
          labelName="Адреса"
          classname={styles.input}
          register={register}
          placeholder="Введіть адресу"
          errors={errors}
        />
      </div>
      <Button type="submit">Зберегти</Button>
    </form>
  );
};

export default ClientForm;

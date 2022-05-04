/** @format */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useCustomTranslation } from "i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "components/UI/Button";
import { styles } from "./styles";
import InputLabel from "components/UI/InputLabel";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password1: yup.string().min(6).max(15).required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Registration = () => {
  const [t] = useCustomTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      <h1 css={styles.title}> {t("registration")} </h1>
      <InputLabel
        inputName="name"
        labelName={t("name")}
        register={register}
        placeholder={t("namePlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="email"
        labelName={t("email")}
        register={register}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="password1"
        labelName={t("password")}
        register={register}
        placeholder={t("passwordPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="password2"
        labelName={t("password")}
        register={register}
        placeholder={t("password2Placeholder")}
        errors={errors}
      />
      <Button type="submit" css={styles.formButton}>
        {t("signIn")}
      </Button>
    </form>
  );
};

export default Registration;

/** @format */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useCustomTranslation } from "i18n";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "components/UI/Button";
import { ROUTES } from "../../utils/urls";
import InputLabel from "components/UI/InputLabel";
import { styles } from "./styles";

const Login = () => {
  const [t] = useCustomTranslation();

  const schema = yup.object().shape({
    email: yup.string().email(t("emailError")).required(t("requiredEmail")),
    password: yup
      .string()
      .min(6, t("passwordErrorMin"))
      .max(15, t("passwordErrorMax"))
      .required(t("requiredPassword")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      <h1 css={styles.title}> {t("login")} </h1>
      <InputLabel
        inputName="email"
        labelName={t("name")}
        register={register}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="password"
        labelName={t("password")}
        register={register}
        placeholder={t("passwordPlaceholder")}
        errors={errors}
      />
      <div>
        <Link css={styles.link} to={ROUTES.registration}>
          {t("createNewAccount")}
        </Link>
      </div>
      <Button type="submit" css={styles.formButton}>
        {t("signIn")}
      </Button>
    </form>
  );
};

export default Login;

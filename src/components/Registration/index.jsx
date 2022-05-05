/** @format */
/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCustomTranslation } from "i18n";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { registration, reset } from "../../features/auth";
import Button from "components/UI/Button";
import { styles } from "./styles";
import InputLabel from "components/UI/InputLabel";

const Registration = () => {
  const [t] = useCustomTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required(t("nameError")),
    email: yup.string().email(t("emailError")).required(t("requiredEmail")),
    password: yup
      .string()
      .min(6, t("passwordErrorMin"))
      .max(15, t("passwordErrorMax"))
      .required(t("requiredPassword")),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], t("passwordErrorMatch")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitForm = (data) => {
    console.log(data);
    const userData = {
      ...data,
    };

    dispatch(registration(userData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

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
        inputName="password"
        labelName={t("password")}
        register={register}
        placeholder={t("passwordPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="password_confirmation"
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

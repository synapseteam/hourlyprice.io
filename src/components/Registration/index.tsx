/** @format */
/** @jsxImportSource @emotion/react */

import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { useCustomTranslation } from "i18n";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { registration, reset } from "../../features/auth";
import Button from "components/UI/Button";
import Spinner from "components/UI/Spinner";
import { ROUTES } from "../../utils/urls";
import InputLabel from "components/UI/InputLabel";
import { styles } from "./styles";

const Registration: FC = (): JSX.Element => {
  const [t] = useCustomTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  } = useForm<FieldValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.info(t("successRegisterCompany"));
      navigate("/companyRegistration");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
    };

    dispatch(registration(userData));
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
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
        type="password"
        errors={errors}
      />
      <InputLabel
        inputName="password_confirmation"
        labelName={t("password2Label")}
        register={register}
        placeholder={t("password2Placeholder")}
        type="password"
        errors={errors}
      />
      <div>
        <span css={styles.haveAccount}>{t("haveAccount1")} </span>
        <Link css={styles.link} to={ROUTES.login}>
          {t("signIn")}
        </Link>
      </div>
      <Button type="submit">{t("register")}</Button>
    </form>
  );
};

export default Registration;

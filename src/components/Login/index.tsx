/** @jsxImportSource @emotion/react */

import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useCustomTranslation } from "i18n";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "components/UI/Button";
import { ROUTES } from "../../utils/urls";
import InputLabel from "components/UI/InputLabel";
import Spinner from "components/UI/Spinner";
import { styles } from "./styles";

const Login: FC = (): JSX.Element => {
  const [t] = useCustomTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      toast.info(t("successLogin"));
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      <h1 css={styles.title}> {t("login")} </h1>
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
        type="password"
      />
      <div>
        <Link css={styles.link} to={ROUTES.registration}>
          {t("createNewAccount")}
        </Link>
      </div>
      <Button type="submit">{t("signIn")}</Button>
    </form>
  );
};

export default Login;

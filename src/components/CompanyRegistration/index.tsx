/** @format */
/** @jsxImportSource @emotion/react */

import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { reset } from "../../features/auth";
import Button from "components/UI/Button";
import Spinner from "components/UI/Spinner";
import InputLabel from "components/UI/InputLabel";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

const CompanyRegistration: FC = (): JSX.Element => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    companyName: yup.string().required(t("nameError")),
    reg: yup.string().required(t("regError")),
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
      toast.info(t("successRegister"));
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      <h1 css={styles.title}> {t("registrationCompany")} </h1>
      <InputLabel
        inputName="companyName"
        labelName={t("companyName")}
        register={register}
        placeholder={t("companyNamePlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="reg"
        labelName={t("reg")}
        register={register}
        placeholder={t("regPlaceholder")}
        errors={errors}
      />
      <Button type="submit">{t("registerCompany")}</Button>
    </form>
  );
};

export default CompanyRegistration;

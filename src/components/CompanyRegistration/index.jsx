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
import { reset } from "../../features/auth";
import Button from "components/UI/Button";
import Spinner from "components/UI/Spinner";
import InputLabel from "components/UI/InputLabel";
import { styles } from "./styles";

const CompanyRegistration = () => {
  const [t] = useCustomTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    companyName: yup.string().required(t("nameError")),
    reg: yup.string().required(t("regError")),
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
      toast.info(t("successRegister"));
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitForm = (data) => {
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
      <Button type="submit" css={styles.formButton}>
        {t("registerCompany")}
      </Button>
    </form>
  );
};

export default CompanyRegistration;

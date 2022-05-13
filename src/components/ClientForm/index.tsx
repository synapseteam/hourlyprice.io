import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputLabel from "components/UI/InputLabel";
import { useCustomTranslation } from "i18n";
import { ROUTES } from "../../utils/urls";
import { useForm } from "react-hook-form";
import { styles } from "./styles";
import Button from "components/UI/Button";
import { Link } from "react-router-dom";

interface Props {
  type?: "button" | "reset" | "submit";
}

const ClientForm: React.FC<Props> = (): JSX.Element => {
  const [t] = useCustomTranslation();

  const schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    reg: yup.string().required(),
    email: yup.string().email(t("emailError")).required(t("requiredEmail")),
    tel: yup.string().required(),
    bank: yup.string().required(),
    account: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const submitForm = async (data: any) => {
    console.log(data);
  };
  //   Адреса: Україна, 58000, Чернівецька обл., місто Чернівці, вул. Небесної сотні, буд.4А
  //   Реєстраційний номер облікової картки платника податків: 1122334455
  //   E-mail: test@synapseteam.com
  //   Телефон: +38068111111
  //   Назва банку: AT Super Банк
  //   Рахунок: UA11111111111111111111111
  return (
    <form onSubmit={handleSubmit(submitForm)} css={styles.form}>
      <h1 css={styles.title}>Замовник</h1>
      <InputLabel
        inputName="name"
        labelName={t("name")}
        register={register}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="address"
        labelName={t("address")}
        register={register}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="reg"
        labelName={t("reg")}
        register={register}
        placeholder={t("emailPlaceholder")}
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
        inputName="tel"
        labelName={t("tel")}
        register={register}
        placeholder={t("passwordPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="bank"
        labelName={t("bank")}
        register={register}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <InputLabel
        inputName="account"
        labelName={t("account")}
        register={register}
        placeholder={t("emailPlaceholder")}
        errors={errors}
      />
      <Button type="submit">{t("signIn")}</Button>
    </form>
  );
};

export default ClientForm;

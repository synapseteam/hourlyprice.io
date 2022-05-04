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
	email: yup.string().email().required(),
	password: yup.string().min(6).max(15).required(),
});

const Login = () => {
	const [t] = useCustomTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const submitForm = (data) => {
		console.log(data.email, data.password);
	};

	return (
		<form onSubmit={handleSubmit(submitForm)} css={styles.form}>
			<InputLabel
				inputName="email"
				register={register}
				placeholder={t("email")}
				errors={errors}
			/>
			<InputLabel
				inputName="password"
				register={register}
				placeholder={t("password")}
				errors={errors}
			/>
			<Button type="submit" css={styles.formButton}>
				{t("signIn")}
			</Button>
		</form>
	);
};

export default Login;

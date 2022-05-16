/** @jsxImportSource @emotion/react */

import { SerializedStyles } from "@emotion/react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { styles } from "./styles";

interface Props {
  labelName: string;
  register: UseFormRegister<FieldValues>;
  classname?: SerializedStyles;
  placeholder?: string;
  changeHandler?: () => void;
  inputName: string;
  type?: string;
  errors: FieldErrors<FieldValues>;
}

const InputLabel: React.FC<Props> = ({
  labelName,
  register,
  classname,
  placeholder,
  changeHandler,
  inputName,
  type = "text",
  errors,
}): JSX.Element => {
  return (
    <label css={styles.label}>
      {labelName}
      <input
        css={[styles.input, classname]}
        {...register(inputName)}
        type={type}
        inputMode="decimal"
        placeholder={placeholder}
        autoComplete="off"
        onChange={changeHandler}
      />
      {errors[inputName] && (
        <p css={styles.error}>{errors[inputName].message}</p>
      )}
    </label>
  );
};

export default InputLabel;

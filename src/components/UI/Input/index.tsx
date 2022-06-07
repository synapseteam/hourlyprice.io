/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { SerializedStyles, Theme } from "@emotion/react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { styles } from "./styles";

interface Props {
  register: UseFormRegister<FieldValues>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  classname?:
    | SerializedStyles
    | SerializedStyles[]
    | ((theme: Theme) => SerializedStyles);
  width?: number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  step?: string;
  maxLength?: number;
}

const BaseInput: React.FC<Props> = ({
  register,
  inputName,
  classname,
  onChange,
  width,
  placeholder,
  disabled,
  readOnly = false,
  type = "text",
  step = "any",
}): JSX.Element => {
  return (
    <input
      {...register(inputName)}
      css={[styles.input, classname]}
      onChange={onChange}
      style={{ width: width + "px" }}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      type={type}
      inputMode="decimal"
      autoComplete="off"
      step={step}
    />
  );
};

export default BaseInput;

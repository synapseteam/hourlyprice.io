/**
 * @format
 * @jsxImportSource @emotion/react
 */

import { SerializedStyles } from "@emotion/react";
import { CSSProperties } from "react";
import { UseFormRegister } from "react-hook-form";
import { styles } from "./styles";

interface Props {
  register: UseFormRegister<any>;
  inputName: string;
  classname: SerializedStyles;
  onChange: () => void;
  width: number;
  placeholder: string;
  disabled: boolean;
  readOnly?: boolean;
  type: string;
  step: string;
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

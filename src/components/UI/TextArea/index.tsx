/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { styles } from "./styles";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ITextArea {
  register: UseFormRegister<FieldValues>;
  inputName: string;
  width: string;
  height: string;
  maxLength: number;
  classname: string;
  disabled: boolean;
}

const TextArea: FC<ITextArea> = ({
  register,
  inputName,
  classname,
  width,
  height,
  maxLength,
  disabled,
}) => {
  return (
    <textarea
      css={[styles.textArea, classname]}
      style={{
        width: width + "px",
        height: height + "px",
        resize: "none",
      }}
      {...register(inputName)}
      inputMode="decimal"
      maxLength={maxLength}
      autoComplete="off"
      disabled={disabled}
    />
  );
};

TextArea.defaultProps = {
  inputName: "textArea",
  width: "200",
  height: "200",
  maxLength: 50,
  classname: "textArea",
  disabled: false,
};

export default TextArea;

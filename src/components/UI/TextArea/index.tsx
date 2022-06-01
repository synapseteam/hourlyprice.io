/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { styles } from "./styles";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { SerializedStyles } from "@emotion/react";

interface ITextArea {
  register: UseFormRegister<FieldValues>;
  inputName: string;
  width?: string;
  height?: string;
  maxLength?: number;
  classname?: SerializedStyles | SerializedStyles[];
  disabled?: boolean;
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

export default TextArea;

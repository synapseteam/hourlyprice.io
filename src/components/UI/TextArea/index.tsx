/** @jsxImportSource @emotion/react */
import React, { FC } from "react";
import { styles } from "./styles";

interface ITextArea {
  register: (text: string) => void;
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

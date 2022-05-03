/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import { styles } from "./styles";

export default function TextArea({
  register,
  inputName,
  classname,
  width,
  height,
  maxLength,
}) {
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
    />
  );
}

TextArea.propTypes = {
  register: PropTypes.func,
  inputName: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  maxLength: PropTypes.number,
  classname: PropTypes.any,
};

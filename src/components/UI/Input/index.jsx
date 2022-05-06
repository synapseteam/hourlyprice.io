/**
 * @format
 * @jsxImportSource @emotion/react
 */

import PropTypes from "prop-types";

import { styles } from "./styles";

export default function BaseInput({
  register,
  inputName,
  classname,
  onChange,
  width,
  placeholder,
  disabled,
  readOnly = false,
  type = "text",
}) {
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
    />
  );
}

BaseInput.propTypes = {
  register: PropTypes.func,
  inputName: PropTypes.string,
  classname: PropTypes.any,
  onChange: PropTypes.func,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

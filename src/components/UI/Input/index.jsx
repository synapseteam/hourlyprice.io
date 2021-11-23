/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";

import { styles } from "./styles";

export default function Input({
  labelName,
  register,
  placeholder,
  changeHandler,
  inputName,
  errors,
  darkMode,
}) {
  const [t] = useCustomTranslation();

  return (
    <>
      <label
        css={() => styles.getStyle(darkMode, "label")}
        className="input__label"
      >
        {labelName}:
        <input
          css={() => styles.getStyle(darkMode, "input")}
          {...register(inputName)}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          autoComplete="off"
          onChange={changeHandler}
          className="input"
        />
        {errors[inputName] && (
          <p
            css={() => styles.getStyle(darkMode, "error")}
            className="input__error"
          >
            {t(inputName + "Error")}
          </p>
        )}
      </label>
    </>
  );
}

Input.propTypes = {
  labelName: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  changeHandler: PropTypes.func,
  inputName: PropTypes.string,
  errors: PropTypes.object,
  darkMode: PropTypes.bool,
};

Input.defaultProps = {
  darkMode: true,
};

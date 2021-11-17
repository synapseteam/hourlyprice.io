import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";

import "components/shared/Input/styles.scss";

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
        className={`input__label ${!darkMode ? "input__label_light" : ""}`}
      >
        {labelName}:
        <input
          {...register(inputName)}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          autoComplete="off"
          onChange={changeHandler}
          className={`input ${!darkMode ? "input_light" : ""}`}
        />
        {errors[inputName] && (
          <p className="error-text">{t(inputName + "Error")}</p>
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
};

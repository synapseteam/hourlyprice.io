import React from "react";
import PropTypes from "prop-types";

import { useCustomTranslation } from "i18n";

export default function Input({
  labelName,
  register,
  placeholder,
  changeHandler,
  inputName,
  errors,
}) {
  const [t] = useCustomTranslation();

  return (
    <>
      <label>
        {labelName}:
        <input
          {...register(inputName)}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          onChange={changeHandler}
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

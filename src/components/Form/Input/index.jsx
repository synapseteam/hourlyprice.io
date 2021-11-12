import React from "react";
import PropTypes from "prop-types";

import { errorsMessages } from "configure";

export default function Input({
  labelName,
  register,
  placeholder,
  changeHandler,
  inputName,
  errors,
}) {
  return (
    <>
      <label>
        {labelName}
        <input
          {...register(inputName)}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          onChange={changeHandler}
        />
        {errors[inputName] && (
          <p className="error-text">{errorsMessages[inputName]}</p>
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

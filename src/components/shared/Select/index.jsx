import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { errorsMessages } from "configure";

import "components/shared/Select/styles.scss";

export default function Select({
  labelName,
  inputName,
  register,
  changeHandler,
  optionsArr,
  value,
  errors,
  darkMode,
}) {
  return (
    <>
      <label
        className={`select__label ${!darkMode ? "select__label_light" : ""}`}
      >
        {labelName}:
        <select
          {...register(inputName)}
          onChange={changeHandler}
          value={value}
          className={`select ${!darkMode ? "select_light" : ""}`}
        >
          {optionsArr &&
            optionsArr.map((name) => (
              <option key={uniqid()} value={name}>
                {name}
              </option>
            ))}
        </select>
        {errors[inputName] && (
          <p className="error-text">{errorsMessages[inputName]}</p>
        )}
      </label>
    </>
  );
}

Select.propTypes = {
  labelName: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  changeHandler: PropTypes.func,
  inputName: PropTypes.string,
  errors: PropTypes.object,
  value: PropTypes.string,
  optionsArr: PropTypes.arrayOf(PropTypes.string),
};

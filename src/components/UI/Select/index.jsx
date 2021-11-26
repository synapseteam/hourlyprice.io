/** @jsxImportSource @emotion/react */
import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { errorsMessages } from "configure";

import { styles } from "./styles";

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
      <label css={() => styles.getStyle(darkMode, "label")}>
        {labelName}:
        <select
          css={() => styles.getStyle(darkMode, "select")}
          {...register(inputName)}
          onChange={changeHandler}
          value={value}
        >
          {optionsArr &&
            optionsArr.map((name) => (
              <option key={uniqid()} value={name}>
                {name}
              </option>
            ))}
        </select>
        {errors[inputName] && <p>{errorsMessages[inputName]}</p>}
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
  darkMode: PropTypes.bool,
};

Select.defaultProps = {
  darkMode: true,
};

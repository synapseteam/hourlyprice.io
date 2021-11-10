import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import { errorsMessages } from "configure";

export default function Select({
  labelName,
  inputName,
  register,
  changeHandler,
  value,
  optionsArr,
  errors,
}) {
  return (
    <>
      <label>
        {labelName}:
        <select {...register(inputName)} onChange={changeHandler} value={value}>
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
};

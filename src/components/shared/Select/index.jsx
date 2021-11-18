import React from "react";
import uniqid from "uniqid";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { errorsMessages } from "configure";

import { StyledLabel } from "../sharedStylesEmotion/StyledLabel";
import {
  darkPurple,
  white,
  lightPurple,
  lightGrey,
} from "components/shared/sharedStylesEmotion/colors";

const StyledSelect = styled.select`
  background-color: ${({ darkMode }) => (darkMode ? darkPurple : white)};
  border: 1px solid ${({ darkMode }) => (darkMode ? lightPurple : lightGrey)};
  border-radius: 0.3rem;
  color: ${({ darkMode }) => (darkMode ? white : darkPurple)};
  padding: 0.8rem 1rem;
  margin-top: 0.4rem;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  outline: ${({ darkMode }) => !darkMode && "none"};
`;

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
      <StyledLabel darkMode={darkMode}>
        {labelName}:
        <StyledSelect
          {...register(inputName)}
          darkMode={darkMode}
          onChange={changeHandler}
          value={value}
        >
          {optionsArr &&
            optionsArr.map((name) => (
              <option key={uniqid()} value={name}>
                {name}
              </option>
            ))}
        </StyledSelect>
        {errors[inputName] && (
          <p className="error-text">{errorsMessages[inputName]}</p>
        )}
      </StyledLabel>
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

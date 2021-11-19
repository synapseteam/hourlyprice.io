import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { useCustomTranslation } from "i18n";

import { StyledLabel } from "components/shared/sharedStylesEmotion/StyledLabel";
import { StyledInput } from "components/shared/sharedStylesEmotion/StyledInput";

const StyledErorrText = styled.p`
  margin: 0.3rem 0 0;
`;

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
      <StyledLabel darkMode={darkMode} className="input__label">
        {labelName}:
        <StyledInput
          {...register(inputName)}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          autoComplete="off"
          onChange={changeHandler}
          darkMode={darkMode}
          className="input"
        />
        {errors[inputName] && (
          <StyledErorrText className="input__error">
            {t(inputName + "Error")}
          </StyledErorrText>
        )}
      </StyledLabel>
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

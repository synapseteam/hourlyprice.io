/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function BaseInput({
  register,
  inputName,
  classname,
  onChange,
  width,
                                    disabled,
  readOnly = false,
  type = "text",
}) {
  return (
    <input
      css={[styles.input, classname]}
      style={{ width: width + "px" }}
      {...register(inputName)}
      type={type}
      readOnly={readOnly}
      inputMode="decimal"
      autoComplete="off"
      onChange={onChange}
      disabled={disabled}
    />
  );
}

BaseInput.propTypes = {
  register: PropTypes.func,
  inputName: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  classname: PropTypes.any,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
	disabled: PropTypes.bool,
};

/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function InputLabel({
  labelName,
  register,
  placeholder,
  changeHandler,
  inputName,
  type = "text",
  errors,
}) {
  return (
    <>
      <label css={styles.label}>
        {labelName}
        <input
          css={styles.input}
          {...register(inputName)}
          type={type}
          inputMode="decimal"
          placeholder={placeholder}
          autoComplete="off"
          onChange={changeHandler}
        />
        {errors[inputName] && (
          <p css={styles.error}>{errors[inputName].message}</p>
        )}
      </label>
    </>
  );
}

InputLabel.propTypes = {
  labelName: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  changeHandler: PropTypes.func,
  inputName: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.object,
};

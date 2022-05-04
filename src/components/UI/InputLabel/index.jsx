/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function InputLabel({
  labelName,
  register,
  placeholder,
  changeHandler,
  inputName,
  errors,
}) {
  return (
    <>
      <label css={styles.label}>
        {labelName}
        <input
          css={styles.input}
          {...register(inputName)}
          type="text"
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
  errors: PropTypes.object,
};

/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function BaseInput({ register, inputName, classname, width }) {
  return (
    <input
      css={[styles.input, classname]}
      style={{ width: width + "px" }}
      {...register(inputName)}
      type="text"
      inputMode="decimal"
      autoComplete="off"
    />
  );
}

BaseInput.propTypes = {
  register: PropTypes.func,
  inputName: PropTypes.string,
  width: PropTypes.string,
  classname: PropTypes.any,
};

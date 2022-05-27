/**
 * @format
 * @jsxImportSource @emotion/react
 */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import { css, Global } from "@emotion/react";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function BaseDatePicker({
  register,
  selected,
  onChange,
  inputName,
  dateFormat = "dd MMMM yyyy",
  width = 170,
  classname,
  disabled,
}) {
  return (
    <span data-comp="hover">
      <Global
        styles={css`
          .react-datepicker-wrapper {
            width: auto;
            text-indent: 0px;
            cursor: pointer;
            input {
              width: ${width}px;
              cursor: pointer;
            }
          }
        `}
      />
      <DatePicker
        css={[styles.fieldDate, classname]}
        locale={uk}
        selected={selected}
        dateFormat={dateFormat}
        {...register(inputName)}
        onChange={onChange}
        disabled={disabled}
      />
    </span>
  );
}

BaseDatePicker.propTypes = {
  register: PropTypes.func,
  selected: PropTypes.any,
  onChange: PropTypes.func,
  inputName: PropTypes.string,
  dateFormat: PropTypes.string,
  classname: PropTypes.any,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

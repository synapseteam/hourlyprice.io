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
  dateFormat,
                                           classname,
                                           disabled,
}) {
  return (
    <>
      <Global
        styles={css`
          .react-datepicker-wrapper {
            width: auto;
            text-indent: 0px;
            input {
              width: 155px;
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
    </>
  );
}

BaseDatePicker.defaultProps = {
	dateFormat: "dd MMMM yyyy",
};

BaseDatePicker.propTypes = {
  register: PropTypes.func,
  selected: PropTypes.any,
  onChange: PropTypes.func,
  inputName: PropTypes.string,
  dateFormat: PropTypes.string,
	classname: PropTypes.any,
	disabled: PropTypes.bool,
};

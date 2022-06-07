/**
 * @format
 * @jsxImportSource @emotion/react
 */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import { css, Global, SerializedStyles } from "@emotion/react";

import { styles } from "./styles";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IProps {
  register: UseFormRegister<FieldValues>;
  selected: number | string | Date;
  onChange: (date: Date) => void;
  inputName: string;
  dateFormat?: string;
  width?: number;
  classname?: SerializedStyles | SerializedStyles[];
  disabled?: boolean;
}

const BaseDatePicker: React.FC<IProps> = ({
  register,
  selected,
  onChange,
  inputName,
  dateFormat = "dd MMMM yyyy",
  width = 170,
  classname,
  disabled,
}): JSX.Element => {
  const parsedDate = new Date(selected);
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
        selected={parsedDate}
        dateFormat={dateFormat}
        {...register(inputName)}
        onChange={onChange}
        disabled={disabled}
      />
    </span>
  );
};

export default BaseDatePicker;

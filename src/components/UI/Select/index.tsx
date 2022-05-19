/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";
import { FC, ChangeEvent } from "react";

import { styles } from "./styles";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IOption } from "typescript/interfaces";
import { SerializedStyles } from "@emotion/react";

interface IProps {
  labelName: string;
  inputName: string;
  classname?: SerializedStyles;
  classnameLabel?: SerializedStyles;
  register: UseFormRegister<FieldValues>;
  changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
  optionsArr: IOption[];
  defaultValue?: string;
  value: string;
  errors: FieldErrors<FieldValues>;
}

const Select: FC<IProps> = ({
  labelName,
  inputName,
  classname,
  classnameLabel,
  register,
  changeHandler,
  optionsArr,
  defaultValue,
  value,
  errors,
}) => {
  return (
    <>
      <label css={[styles.label, classnameLabel]}>
        {labelName}:
        <select
          css={[styles.select, classname]}
          {...register(inputName)}
          onChange={changeHandler}
          defaultValue={defaultValue}
          value={value}
        >
          {optionsArr &&
            optionsArr.map((item) => (
              <option key={uniqid()} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
        {errors[inputName] && <p>error</p>}
      </label>
    </>
  );
};

export default Select;

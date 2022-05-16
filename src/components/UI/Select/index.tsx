/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";
import { FC, ChangeEvent } from "react";

import { styles } from "./styles";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IOption } from "typescript/interfaces";

interface IProps {
  labelName: string;
  inputName: string;
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
  register,
  changeHandler,
  optionsArr,
  defaultValue,
  value,
  errors,
}) => {
  return (
    <>
      <label css={styles.label}>
        {labelName}:
        <select
          css={styles.select}
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

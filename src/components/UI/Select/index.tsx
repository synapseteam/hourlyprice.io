/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";
import { FC, ChangeEvent } from "react";

import { styles } from "./styles";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IProps {
  labelName: string;
  inputName: string;
  register: UseFormRegister<FieldValues>;
  changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
  optionsArr: string[];
  value: string[];
  errors: FieldErrors<FieldValues>;
}

const Select: FC<IProps> = ({
  labelName,
  inputName,
  register,
  changeHandler,
  optionsArr,
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
          value={value}
        >
          {optionsArr &&
            optionsArr.map((name) => (
              <option key={uniqid()} value={name}>
                {name}
              </option>
            ))}
        </select>
        {errors[inputName] && <p>error</p>}
      </label>
    </>
  );
};

export default Select;

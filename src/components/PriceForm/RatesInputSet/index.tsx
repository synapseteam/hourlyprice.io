/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { ICurrency } from "typescript/interfaces";
import uniqid from "uniqid";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { handlePriceChange } from "utils/generic";

import { styles } from "./styles";

interface IRatesInputSet {
  register: UseFormRegister<FieldValues>;
  chosenCurrency: string;
  allCurrencies: ICurrency[];
  error: Record<string, string>;
}

const RatesInputSet: FC<IRatesInputSet> = ({ register, allCurrencies }) => {
  const allCurrenciesNames = allCurrencies.map((el: { name: string }) => ({
    name: el.name,
  }));

  return (
    <div css={styles.ratesInputsContainer}>
      {allCurrenciesNames.map(({ name }) => {
        return (
          <input
            css={styles.ratesInput}
            {...register(name)}
            key={uniqid()}
            inputMode="decimal"
            type="text"
            autoComplete="off"
            placeholder={name}
            onChange={handlePriceChange}
          />
        );
      })}
    </div>
  );
};

export default RatesInputSet;

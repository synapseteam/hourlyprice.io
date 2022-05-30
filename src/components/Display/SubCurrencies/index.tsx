/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";

import SubCurrency from "components/Display/SubCurrencies/SubCurrency";
import { ZERO_VAL } from "utils/constants";

import { styles } from "./styles";
import { IOption } from "typescript/interfaces";

const initialSubCurrenciesArr: IOption[] = [
  { label: "EUR", value: "0.00" },
  { label: "UAH", value: "0.00" },
];

interface IProps {
  subCurrenciesArr: IOption[];
  isLoading: boolean;
}

const SubCurrenciesDisplay: React.FC<IProps> = ({
  subCurrenciesArr = initialSubCurrenciesArr,
  isLoading,
}): JSX.Element => {
  return (
    <div css={styles.mainContainer}>
      {subCurrenciesArr.map((el) => (
        <SubCurrency
          name={el.label}
          value={el.value || ZERO_VAL}
          key={uniqid()}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default SubCurrenciesDisplay;

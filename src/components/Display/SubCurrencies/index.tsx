/** @jsxImportSource @emotion/react */
import uniqid from "uniqid";

import SubCurrency from "components/Display/SubCurrencies/SubCurrency";
import { ZERO_VAL } from "utils/constants";

import { styles } from "./styles";
import { IOption } from "typescript/interfaces";

const initialSubCurrenciesArr: IOption[] = [
  { name: "EUR", value: "0.00" },
  { name: "UAH", value: "0.00" },
];

interface IProps {
  subCurrenciesArr: IOption[];
  isLoading: boolean;
}

const SubCurrenciesDisplay: React.FC<IProps> = ({
  subCurrenciesArr = initialSubCurrenciesArr,
  isLoading,
}): JSX.Element => {
  console.log("initial: ", initialSubCurrenciesArr);
  console.log(subCurrenciesArr);
  return (
    <div css={styles.mainContainer}>
      {subCurrenciesArr.map((el) => (
        <SubCurrency
          name={el.name}
          value={el.value || ZERO_VAL}
          key={uniqid()}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default SubCurrenciesDisplay;

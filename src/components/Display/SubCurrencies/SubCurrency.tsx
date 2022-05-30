/** @jsxImportSource @emotion/react */

import SkeletonLoader from "components/UI/SkeletonLoader";

import { styles } from "./styles";

interface IProps {
  name: string;
  value: string | number;
  isLoading: boolean;
}
const SubCurrency: React.FC<IProps> = ({
  name = "USD",
  value = "0.00",
  isLoading = false,
}): JSX.Element => {
  return (
    <div css={styles.subCurrencyContainer}>
      <div css={styles.subCurrencyTitlte}>{name}</div>
      <div css={styles.subCurrencySum}>
        {isLoading ? <SkeletonLoader size="m" /> : value}
      </div>
    </div>
  );
};

export default SubCurrency;

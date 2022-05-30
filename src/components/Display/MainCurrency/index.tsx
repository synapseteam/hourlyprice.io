/** @jsxImportSource @emotion/react */

import { useCustomTranslation } from "i18n";
import SkeletonLoader from "components/UI/SkeletonLoader";

import { styles } from "./styles";

const initSum = 0.0;

interface IProps {
  sum: number;
  currency: string;
  isLoading: boolean;
}

const MainCurrencyDisplay: React.FC<IProps> = ({
  sum = initSum,
  currency = "USD",
  isLoading = false,
}): JSX.Element => {
  const [t] = useCustomTranslation();
  return (
    <>
      <h2 css={styles.title}>{t("totalPrice")}</h2>
      <div css={styles.mainContainer}>
        {isLoading ? (
          <SkeletonLoader size="l" />
        ) : (
          <p css={styles.sum}>{`${sum}${currency}`}</p>
        )}
      </div>
    </>
  );
};

export default MainCurrencyDisplay;

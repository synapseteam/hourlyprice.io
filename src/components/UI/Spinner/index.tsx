/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTheme, Theme } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { styles } from "./styles";

interface ISpinner {
  isLoading: boolean;
}

const Spinner: FC<ISpinner> = ({ isLoading }) => {
  const theme: Theme = useTheme();

  return (
    <div css={styles.loader}>
      <ClipLoader color={theme.skeletonBg} loading={isLoading} size={150} />
    </div>
  );
};

export default Spinner;

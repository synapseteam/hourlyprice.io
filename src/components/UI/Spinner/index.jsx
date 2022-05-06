/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { styles } from "./styles";

const Spinner = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <div css={styles.loader}>
      <ClipLoader color={theme.skeletonBg} loading={isLoading} size={150} />
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

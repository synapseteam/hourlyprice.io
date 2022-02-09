/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function Logo({ logoText = "hourlyprice.io" }) {
  return <p css={styles.logo}>{logoText}</p>;
}

Logo.propTypes = {
  logoText: PropTypes.string,
};

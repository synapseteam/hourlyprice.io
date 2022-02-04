/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function Logo({ logoText }) {
  return <p css={styles.logo}>{logoText}</p>;
}

Logo.propTypes = {
  logoText: PropTypes.string,
};

Logo.defaultProps = {
  logoText: "hourlyprice.io",
};

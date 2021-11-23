/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";

import { styles } from "./styles";

export default function Logo({ logoText }) {
  const [{ darkMode }] = useAppThemeContext();
  return <p css={() => styles.getStyle(darkMode, "logo")}>{logoText}</p>;
}

Logo.propTypes = {
  logoText: PropTypes.string,
};

Logo.defaultProps = {
  logoText: "hourlyprice.io",
};

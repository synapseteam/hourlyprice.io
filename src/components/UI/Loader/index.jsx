import React from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";

import { white, darkGrey } from "components/UI/sharedStylesEmotion/colors.js";

export default function CustomLoader({ size }) {
  const [{ darkMode }] = useAppThemeContext();
  return (
    <div>
      <Loader
        type="ThreeDots"
        color={darkMode ? white : darkGrey}
        height={size}
        width={size}
      />
    </div>
  );
}

CustomLoader.propTypes = {
  size: PropTypes.number,
};

CustomLoader.defaultProps = {
  size: 80,
};

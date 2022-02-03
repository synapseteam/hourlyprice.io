/** @jsxImportSource @emotion/react */
import React from "react";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";

import {
  mediumGrey,
  darkGrey,
  skeletonLoaderDarkPurple,
  skeletonLoaderPurple,
} from "components/UI/sharedStylesEmotion/colors.js";
import { styles } from "./styles";

const SkeletonLoader = ({ size, ...props }) => {
  const canvasWidth = size === "l" ? 200 : 80;
  const canvasHeight = size === "l" ? 110 : 18;
  const skeletonWidth = size === "l" ? 95 : 80;
  const skeletonHeight = size === "l" ? 110 : 18;
  const borderRadius = size === "l" ? 12 : 4;

  const [context] = useAppThemeContext();
  const darkMode = context.darkMode;

  return (
    <ContentLoader
      speed={2}
      width={skeletonWidth}
      height={skeletonHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      backgroundColor={darkMode ? skeletonLoaderDarkPurple : darkGrey}
      foregroundColor={darkMode ? skeletonLoaderPurple : mediumGrey}
      {...props}
      css={
        size === "l" ? styles.bigLoaderContainer : styles.smallLoaderContainer
      }
    >
      <rect
        x="0"
        y="0"
        rx={borderRadius}
        ry={borderRadius}
        width={canvasWidth}
        height={canvasHeight}
      />
    </ContentLoader>
  );
};

SkeletonLoader.propTypes = {
  size: PropTypes.string.isRequired,
  props: PropTypes.object,
};

SkeletonLoader.defaulProps = {
  size: "m",
};

export default SkeletonLoader;

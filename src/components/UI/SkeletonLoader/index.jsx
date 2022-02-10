/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

import { styles } from "./styles";

const SkeletonLoader = ({ size, ...props }) => {
  const theme = useTheme();

  const canvasWidth = size === "l" ? 200 : 80;
  const canvasHeight = size === "l" ? 110 : 18;
  const skeletonWidth = size === "l" ? 95 : 80;
  const skeletonHeight = size === "l" ? 110 : 18;
  const borderRadius = size === "l" ? 12 : 4;

  return (
    <ContentLoader
      speed={2}
      width={skeletonWidth}
      height={skeletonHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      backgroundColor={theme.skeletonBg}
      foregroundColor={theme.skeletonFg}
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

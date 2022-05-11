/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTheme, Theme } from "@emotion/react";
import ContentLoader from "react-content-loader";

import {
  CANVAS_WIDTH_M,
  CANVAS_WIDTH_L,
  CANVAS_HEIGHT_M,
  CANVAS_HEIGHT_L,
  SKELETON_WIDTH_M,
  SKELETON_WIDTH_L,
  SKELETON_HEIGHT_M,
  SKELETON_HEIGHT_L,
  SKELETOIN_BORDER_RADIUS_M,
  SKELETOIN_BORDER_RADIUS_L,
} from "utils/constants";

import { styles } from "./styles";

interface ISceletonLoader {
  size: string;
  props: Record<string, unknown>;
}

const SkeletonLoader: FC<ISceletonLoader> = ({ size, ...props }) => {
  const theme: Theme = useTheme();

  const canvasWidth = size === "l" ? CANVAS_WIDTH_L : CANVAS_WIDTH_M;
  const canvasHeight = size === "l" ? CANVAS_HEIGHT_L : CANVAS_HEIGHT_M;
  const skeletonWidth = size === "l" ? SKELETON_WIDTH_L : SKELETON_WIDTH_M;
  const skeletonHeight = size === "l" ? SKELETON_HEIGHT_L : SKELETON_HEIGHT_M;
  const borderRadius =
    size === "l" ? SKELETOIN_BORDER_RADIUS_L : SKELETOIN_BORDER_RADIUS_M;

  return (
    <ContentLoader
      speed={2}
      width={skeletonWidth}
      height={skeletonHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      backgroundColor={theme.color.skeletonBg}
      foregroundColor={theme.color.skeletonFg}
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

SkeletonLoader.defaultProps = {
  size: "m",
};

export default SkeletonLoader;

/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function ContentContainer({ children }) {
  return <div css={styles.contentContainer}>{children}</div>;
}

ContentContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
};

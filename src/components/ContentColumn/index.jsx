import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

export default function ContentColumn({ children }) {
  return <div className="content-column">{children}</div>;
}

ContentColumn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

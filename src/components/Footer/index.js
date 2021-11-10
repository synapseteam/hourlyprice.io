import React from "react";
import PropTypes from "prop-types";

import "components/Footer/styles.scss";

export default function Footer({ companyName }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">{`© ${companyName}, ${currentYear}`}</p>
    </footer>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
};

Footer.defaultProps = {
  companyName: "Synapse Team",
};

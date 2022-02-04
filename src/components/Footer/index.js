/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function Footer({ companyName, companyUrl }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer css={styles.footer}>
      <p css={styles.footerText}>
        <a
          css={styles.footerLink}
          href={companyUrl}
          target="_blank"
          rel="noreferrer"
        >{`© ${companyName}, ${currentYear}`}</a>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  companyUrl: PropTypes.string,
};

Footer.defaultProps = {
  companyName: "Synapse Team LLC",
  companyUrl: "https://synapseteam.com",
};

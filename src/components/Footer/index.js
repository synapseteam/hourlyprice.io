/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function Footer({
  companyName = "Synapse Team LLC",
  companyUrl = "https://synapseteam.com",
}) {
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

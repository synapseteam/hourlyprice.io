/** @jsxImportSource @emotion/react */
import React from "react";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";

import { styles } from "./styles";

export default function Footer({ companyName, companyUrl }) {
  const currentYear = new Date().getFullYear();

  const [{ darkMode }] = useAppThemeContext();

  return (
    <footer css={() => styles.getStyle(darkMode, "footer")}>
      <p css={() => styles.getStyle(darkMode, "footerText")}>
        <a
          css={() => styles.getStyle(darkMode, "footerLink")}
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

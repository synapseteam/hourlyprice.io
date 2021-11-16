import React from "react";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";

import "components/Footer/styles.scss";

export default function Footer({ companyName, companyUrl }) {
  const currentYear = new Date().getFullYear();

  const [context] = useAppThemeContext();

  return (
    <footer className={context.darkMode ? "footer" : "footer light-footer"}>
      <p className="footer-text">
        <a
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

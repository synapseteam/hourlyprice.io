/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/urls";

import { styles } from "./styles";

export default function Logo({ logoText = "hourlyprice.io" }) {
  return (
    <Link to={ROUTES.home} css={styles.logo}>
      {logoText}
    </Link>
  );
}

Logo.propTypes = {
  logoText: PropTypes.string,
};

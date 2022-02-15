/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { ROUTES_HOME } from "utils/constants";

import { styles } from "./styles";

export default function ListItem({ langChangeHandler, localeString = "EN" }) {
  return (
    <li css={styles.langListItem}>
      <a
        css={styles.langListLink}
        href={ROUTES_HOME}
        onClick={langChangeHandler}
      >
        {localeString.toUpperCase()}
      </a>
    </li>
  );
}

ListItem.propTypes = {
  langChangeHandler: PropTypes.func.isRequired,
  localeString: PropTypes.string.isRequired,
};

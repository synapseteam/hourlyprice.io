/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";

import { styles } from "./styles";

export default function ListItem({ langChangeHandler, localeString = "EN" }) {
  return (
    <li css={styles.langListItem}>
      <a css={styles.langListLink} href="/" onClick={langChangeHandler}>
        {localeString.toUpperCase()}
      </a>
    </li>
  );
}

ListItem.propTypes = {
  langChangeHandler: PropTypes.func.isRequired,
  localeString: PropTypes.string.isRequired,
};

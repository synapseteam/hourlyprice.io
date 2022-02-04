/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";
import { useCustomTranslation } from "i18n";

import { styles } from "./styles";

export default function ButtonSubmit() {
  const [t] = useCustomTranslation();

  return (
    <div css={styles.buttonContainer}>
      <button css={styles.button} type="submit" color="red">
        {t("btnResult").toUpperCase()}
      </button>
    </div>
  );
}

ButtonSubmit.propTypes = {
  formId: PropTypes.string,
};

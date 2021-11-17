import React from "react";
import PropTypes from "prop-types";

import { useAppThemeContext } from "context/AppContext";
import { useCustomTranslation } from "i18n";

import "components/shared/Button/styles.scss";

export default function ButtonSubmit({ formId }) {
  const [context] = useAppThemeContext();
  const [t] = useCustomTranslation();

  const additionalProps = formId
    ? {
        form: formId,
      }
    : null;

  return (
    <div
      className={
        context.darkMode
          ? "calculate-btn-container"
          : "calculate-btn-container light-btn"
      }
    >
      <button className="calculate-btn" {...additionalProps}>
        {t("btnResult").toUpperCase()}
      </button>
    </div>
  );
}

ButtonSubmit.propTypes = {
  formId: PropTypes.string,
};

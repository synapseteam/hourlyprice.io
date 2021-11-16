import React from "react";

import { useAppThemeContext } from "context/AppContext";
import { useCustomTranslation } from "i18n";

import "components/ButtonSubmit/styles.scss";

export default function ButtonSubmit() {
  const [context] = useAppThemeContext();
  const [t] = useCustomTranslation();

  return (
    <div
      className={
        context.darkMode
          ? "calculate-btn-container"
          : "calculate-btn-container light-btn"
      }
    >
      <button form="calc-form" className="calculate-btn">
        {t("btnResult").toUpperCase()}
      </button>
    </div>
  );
}

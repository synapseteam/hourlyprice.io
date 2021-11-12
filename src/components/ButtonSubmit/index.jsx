import React from "react";

import { buttonText } from "configure";
import { useAppThemeContext } from "context/AppContext";

import "components/ButtonSubmit/styles.scss";

export default function ButtonSubmit() {
  const [state] = useAppThemeContext();

  return (
    <div
      className={
        state.darkMode
          ? "calculate-btn-container"
          : "calculate-btn-container light-btn"
      }
    >
      <button form="calc-form" className="calculate-btn">
        {buttonText}
      </button>
    </div>
  );
}

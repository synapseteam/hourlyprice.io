import React from "react";

import "./styles.scss";
import { buttonText } from "../../configure";

export default function ButtonSubmit() {
  return (
    <div className="calculate-btn-container">
      <button form="calc-form" className="calculate-btn">
        {buttonText}
      </button>
    </div>
  );
}

import React from "react";

import { useAppThemeContext } from "context/AppContext";

import "components/shared/Loader/styles.scss";

export default function Loader() {
  const [context] = useAppThemeContext();
  return (
    <div
      className={`lds-ellipsis ${
        !context.darkMode ? "lds-ellipsis_light" : ""
      }`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

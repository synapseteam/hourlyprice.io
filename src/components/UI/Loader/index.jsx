import React from "react";

import { useAppThemeContext } from "context/AppContext";

import "components/UI/Loader/styles.scss";

export default function Loader() {
  const [{ darkMode }] = useAppThemeContext();
  return (
    <div className={`lds-ellipsis ${!darkMode ? "lds-ellipsis_light" : ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

import React from "react";

import "components/Header/Logo/styles.scss";
import { useAppThemeContext } from "context/AppContext";

export default function Logo({ logoText }) {
  const [state] = useAppThemeContext();
  return (
    <div
      className={
        state.darkMode ? "logo-container" : "logo-container light-logo"
      }
    >
      <p className="logo">hourlyprice.io</p>
    </div>
  );
}
